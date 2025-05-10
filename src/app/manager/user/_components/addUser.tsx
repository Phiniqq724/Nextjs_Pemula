"use client";

import { iUser } from "@/lib/types";
import { BASE_API_URL } from "@/lib/global";
import { post } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Buttons";
import { InputGroupComponent } from "@/components/input";
import Modal from "@/components/modal";
import Select from "@/components/select";
import FileInput from "@/components/fileInput";

const AddUser = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [user, setUser] = useState<iUser>({
    idUser: 0,
    uuid: ``,
    name: ``,
    email: ``,
    password: ``,
    role: `CASHIER`,
    profilePicture: ``,
    createdAt: ``,
    updatedAt: ``,
  });
  const router = useRouter();
  const TOKEN = getCookie("token") || "";
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const openModal = () => {
    setUser({
      idUser: 0,
      uuid: ``,
      name: ``,
      email: ``,
      password: ``,
      role: `CASHIER`,
      profilePicture: ``,
      createdAt: ``,
      updatedAt: ``,
    });
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user`;
      const { name, email, role, password } = user;
      const payload = new FormData();
      payload.append("name", name || "");
      payload.append("email", email || "");
      payload.append("role", role || "");
      payload.append("password", password || "");
      if (file !== null) payload.append("Picture", file || "");
      const { data } = await post(url, payload, TOKEN);
      if (data?.status) {
        setIsShow(false);
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message, {
          hideProgressBar: true,
          containerId: `toastUser`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something Wrong`, {
        hideProgressBar: true,
        containerId: `toastUser`,
        type: `error`,
      });
    }
  };
  return (
    <div>
      <Button variants="success" onClick={() => openModal()}>
        <div className="flex justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </Button>
      <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
        <form onSubmit={handleSubmit}>
          {/* modal header */}
          <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
            <div className="w-full flex items-center">
              <div className="flex flex-col">
                <strong className="font-bold text-2xl">Create New User</strong>
                <small className="text-slate-400 text-sm">
                  Managers can create user accounts on this page.
                </small>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  title="Close Modal"
                  className="text-slate-400"
                  onClick={() => setIsShow(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* end modal header */}

          {/* modal body */}
          <div className="p-5">
            <InputGroupComponent
              id={`name`}
              type="text"
              value={user.name || ""}
              onChange={(val) => setUser({ ...user, name: val })}
              required={true}
              label="Name"
            />

            <InputGroupComponent
              id={`email`}
              type="email"
              value={user.email}
              onChange={(val) => setUser({ ...user, email: val })}
              required={true}
              label="Email"
            />

            <InputGroupComponent
              id={`password`}
              type="password"
              value={user.password}
              onChange={(val) => setUser({ ...user, password: val })}
              required={true}
              label="Password"
            />

            <Select
              id={`role`}
              value={user.role}
              label="Role"
              required={true}
              onChange={(val) =>
                setUser({
                  ...user,
                  role: val as "CASHIER" | "MANAGER",
                })
              }
            >
              <option value="">--- Select Role ---</option>
              <option value="CASHIER">Cashier</option>
              <option value="MANAGER">Manager</option>
            </Select>

            <FileInput
              acceptTypes={[
                "application/pdf",
                "image/png",
                "image/jpeg",
                "image/jpg",
              ]}
              id="profilePicture"
              label="Upload Profile Picture (Max 2MB, PDF/JPG/JPEG/PNG)"
              onChange={(f) => setFile(f)}
              required={false}
            />
          </div>
          {/* end modal body */}

          {/* modal footer */}
          <div className="w-full p-5 flex rounded-b-2xl shadow">
            <div className="flex ml-auto gap-2">
              <Button variants="danger" onClick={() => setIsShow(false)}>
                Cancel
              </Button>
              <Button variants="success">Save</Button>
            </div>
          </div>
          {/* end modal footer */}
        </form>
      </Modal>
    </div>
  );
};

export default AddUser;
