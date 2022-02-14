/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/14/22, 1:04 PM
 *
 *
 */

import React, { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Heading } from "@/components/Headings";
import { Button, GrayButton } from "@/components/Button";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import toast from "react-hot-toast";
import { TableView } from "@/components/Table";
import { postMemberBulk } from "@/services/requests/memberRequests";
import { useDropzone } from "react-dropzone";
import { CaretCircleDown, CaretCircleUp } from "phosphor-react";
import { alert } from "@/components/Alert";
import { queryClient } from "@/pages/_app";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "12rem",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "##e2e8f0",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  fontSize: "1.2rem",
};

const focusedStyle = {
  borderColor: "#22c55e",
};

const acceptStyle = {
  borderColor: "#15803d",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export const ExcelImport = () => {
  const [open, setOpen] = useState(false);
  const [importedData, setImportedData] = useState<any[]>([]);
  const [shownDataLength, setShowDataLength] = useState(8);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    const reader = new FileReader();

    reader.onload = function () {
      toast.loading("Uploading files", {
        id: "upload-files-toast",
      });
      const ab = reader.result;
      const wb = XLSX.read(ab, {
        type: "array",
        cellDates: true,
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data: any[][] = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        blankrows: false,
        defval: "",
        raw: false,
      });

      const headersArr: any[][] = data.slice(0, 1);
      const headers: any[] = headersArr[0];
      data.shift();

      if (
        data.some((patientData) =>
          patientData.some((patientDetails) => patientDetails === "")
        )
      ) {
        toast.error("Some of field are empty. Please fill all fields");
        return;
      }

      const final_data: Record<any, any>[] = [];

      data.forEach((member) => {
        let temp = {};
        member.forEach((memberDetails, index) => {
          temp = { ...temp, [headers[index]]: memberDetails };
        });
        final_data.push(temp);
      });

      if (final_data.length === 0) {
        toast.error("Given Excel file was empty or invalid");
      }
      setImportedData(final_data);
    };

    reader.onloadend = function () {
      toast.dismiss("upload-files-toast");
    };

    if (acceptedFiles) {
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  }, []);
  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const closeModal = () => {
    setOpen(false);
    setImportedData([]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const openModal = () => setOpen(true);
  const headers = ["name", "dob_ad", "gender", "ref_key", "patient_code"];

  return (
    <div className="flex space-x-2">
      <Button
        onClick={() => {
          openModal();
          const wb = XLSX.utils.book_new();

          wb.SheetNames.push("patients");
          wb.Sheets["patients"] = XLSX.utils.aoa_to_sheet([headers]);

          const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
          });
          const finalData = new Blob([excelBuffer], {
            type: "application/octet-stream",
          });
          FileSaver.saveAs(finalData, "members.xlsx");
        }}
      >
        Import
      </Button>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className={`fixed inset-0 bg-black opacity-50`} />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-8xl px-12 py-8 my-16 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Heading
                  title={"Import Members"}
                  subtitle={
                    "Please enter data into the supplied excel file, filling out all fields. Following the completion of the data. Please upload the excel file."
                  }
                />

                {importedData.length !== 0 ? (
                  <div className="flex flex-col gap-2">
                    <TableView
                      data={importedData.slice(0, shownDataLength)}
                      search={false}
                    />

                    {importedData.length > 8 && (
                      <div
                        onClick={() =>
                          shownDataLength === importedData.length
                            ? setShowDataLength(8)
                            : setShowDataLength(importedData.length)
                        }
                        className="self-end cursor-pointer text-xl border-t-[1px] py-4 pl-36 border-gray-400/20 font-semibold text-gray-700 space-x-2 flex items-center"
                      >
                        {shownDataLength === importedData.length ? (
                          <>
                            <span>Hide patients</span>
                            <CaretCircleUp size={24} weight={"fill"} />
                          </>
                        ) : (
                          <>
                            <span>
                              Show other {importedData.length - shownDataLength}{" "}
                              patients
                            </span>
                            <CaretCircleDown size={24} weight={"fill"} />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <section className="">
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} style={{ display: "none" }} />
                      <p>
                        Drag and drop filled excel file here, or click to select
                        that file
                      </p>
                    </div>
                  </section>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={async () => {
                      await alert({
                        type: "promise",
                        promise: postMemberBulk({ data: importedData }).then(
                          () => {
                            closeModal();
                            setImportedData([]);
                            queryClient.invalidateQueries("member-list");
                          }
                        ),

                        msgs: {
                          loading: "Adding Patients",
                          success: "Added Patient Successfully",
                        },
                        id: "patient-add-bulk",
                      });
                    }}
                  >
                    Import
                  </Button>
                  {importedData.length !== 0 && (
                    <GrayButton
                      onClick={() => {
                        setImportedData([]);
                        setShowDataLength(8);
                      }}
                    >
                      Clear
                    </GrayButton>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
