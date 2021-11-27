import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import withAuth from "@/hoc/withAuth";
import type { NextPage } from "next";
import { MainLayout } from "../layout/MainLayout";

const UserPage: NextPage = () => {
  return (
    <MainLayout>
      <div className="p-8">
        <Modal>
          <Modal.Button type="open">
            <div className="bg-red-400 w-24 h-32">Hello World</div>
          </Modal.Button>
          <Modal.Content title="Component Modal">
            <Modal.Button type="close">
              <Button>Close</Button>
            </Modal.Button>
          </Modal.Content>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default withAuth(UserPage);
