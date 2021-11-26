import type { NextPage } from "next";
import { MainLayout } from "../layout/MainLayout";

const UserPage: NextPage = () => {
  return (
    <MainLayout>
      <div className="p-8">
        {/* <Modal.Container title="Component Modal">
          <Modal.Button>
            <div className="bg-red-400 w-24 h-32">Hello World</div>
          </Modal.Button>
          
        </Modal.Container> */}
      </div>
    </MainLayout>
  );
};

export default UserPage;
