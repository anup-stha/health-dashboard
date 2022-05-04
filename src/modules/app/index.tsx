/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import { dropdownStyles } from "@/modules/members/components/others/PatientExcelImport/styles";
import { getSignedUrl } from "@/services/requests/app.service";

/**
 *
 * @constructor
 */
export function AppPost() {
  const [importedData, setImportedData] = useState<any[]>([]);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const response = await getSignedUrl({
      member_id: 1,
      file_name: [acceptedFiles[0].name],
      type: "app/release",
    });

    const fd = new FormData();
    fd.append("file", acceptedFiles[0], acceptedFiles[0].name);

    if (response) {
      console.log(response);

      const put_response = await axios.put(response.data.data[0].put_url, fd);
      if (put_response.status === 200) {
        console.log(response.data.data[0].public_url);
      }
    }

    console.log(response.status);
  }, []);
  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...dropdownStyles.baseStyle,
      ...(isFocused ? dropdownStyles.focusedStyle : {}),
      ...(isDragAccept ? dropdownStyles.acceptStyle : {}),
      ...(isDragReject ? dropdownStyles.rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  console.log(importedData);

  return (
    <section className="">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} style={{ display: "none" }} />
        <p>Drag and drop filled excel file here, or click to select that file</p>
      </div>
    </section>
  );
}
