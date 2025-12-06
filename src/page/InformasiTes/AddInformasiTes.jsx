import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/api";
import Dashboard from "../../template/Dashboard";
import useTitle from "../../utils/useTitle";

const AddInformasiTes = () => {
  useTitle("Tambah Informasi Pendaftaran - Dashboard");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_tes: "",
    deskripsi_tes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});

  // Fungsi untuk menghandle inputan dari form
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // Fungsi untuk menghandle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    console.log(formData);

    try {
      // Jangan lupa ganti endpointnya
      await post("/information/test/", {
        nama_tes: formData.nama_tes,
        deskripsi_tes: formData.deskripsi_tes,
      });

      navigate("/informasi-tes", {
        state: { successMsg: "Informasi tes berhasil ditambahkan" },
      });
    } catch (err) {
      // setError("Gagal menambahkan tes pendaftaran. Silakan coba lagi.");
      // console.log(formData);
      // console.log(err);

      if (err.response && err.response.data.errors) {
        const errorResponse = err.response.data.errors;
        const formattedErrors = {};

        errorResponse.forEach((error) => {
          formattedErrors[error.path] = error.msg;
        });
        setError(formattedErrors);
      } else {
        setError({
          general: "Gagal menambahkan Informasi Tes. Silahkan coba lagi!",
        });
      }
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dashboard title="Tambah Informasi Tes">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Form Tambah Informasi Tes</h2>
          <p className="mt-1 text-sm text-gray-600">
            Tambahkan informasi lengkap untuk tes baru
          </p>
        </div>

        {error.general && (
          <div className="p-3 mx-6 mt-4 text-red-700 bg-red-100 rounded-md">
            {error.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-gray-600">
          <div className="pb-6 border-b">
            <h3 className="mb-4 text-lg font-semibold">Informasi Tes</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Nama Tes */}
              <div className="mb-4">
                <label
                  htmlFor="nama_tes"
                  className="block mb-2 font-medium text-md"
                >
                  Nama Tes
                </label>
                <input
                  type="text"
                  id="nama_tes"
                  name="nama_tes"
                  value={formData.nama_tes}
                  onChange={handleChange}
                  className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${error?.nama_tes ? "ring-red-500 border-red-500" : ""} 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
                  placeholder="Masukkan Nama Tes"
                  required
                />
                {error.nama_tes && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.nama_tes}
                  </div>
                )}
              </div>

              {/* Deskripsi Tes */}
              <div className="mb-4">
                <label
                  htmlFor="deskripsi_tes"
                  className="block mb-2 font-medium text-md"
                >
                  Deskripsi Tes
                </label>
                <textarea
                  id="deskripsi_tes"
                  name="deskripsi_tes"
                  value={formData.deskripsi_tes}
                  onChange={handleChange}
                  rows={4}
                  className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${
                      error?.deskripsi_tes ? "ring-red-500 border-red-500" : ""
                    } 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
                  placeholder="Masukkan Deskripsi Tes"
                  required
                />
                {error.deskripsi_tes && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.deskripsi_tes}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 mt-6 space-x-4">
            <button
              type="button"
              onClick={() => navigate("/informasi-tes")}
              className="px-5 py-2 text-sm font-semibold text-center text-red-500 bg-white border-2 border-red-500 rounded-md active:scale-95 focus:outline-none"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-center text-white bg-red-500 rounded-md active:scale-95 focus:outline-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddInformasiTes;
