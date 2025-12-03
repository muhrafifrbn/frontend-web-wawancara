import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/api";
import Dashboard from "../../template/Dashboard";
import useTitle from "../../utils/useTitle";

const AddInformasiPendaftaran = () => {
  useTitle("Tambah Informasi Pendaftaran - Dashboard");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_gelombang: "",
    deskripsi: "",
    tanggal_mulai: "",
    tanggal_akhir: "",
    status_gelombang: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    setError({});

    // Validate dates
    // if (new Date(formData.tanggal_mulai) >= new Date(formData.tanggal_akhir)) {
    //   setError("Tanggal selesai harus setelah tanggal mulai");
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      await post("/information/registration/create", {
        nama_gelombang: formData.nama_gelombang,
        deskripsi: formData.deskripsi,
        tahun_ajaran: formData.tahun_ajaran,
        tanggal_mulai: formData.tanggal_mulai,
        tanggal_akhir: formData.tanggal_akhir,
      });

      navigate("/informasi-pendaftaran", {
        state: { successMsg: "Informasi pendaftaran berhasil ditambahkan" },
      });
    } catch (err) {
      // setError("Gagal menambahkan informasi pendaftaran. Silakan coba lagi.");
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
          general:
            "Gagal menambahkan informasi pendaftaran. Silakan coba lagi.",
        });
      }
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dashboard title="Tambah Informasi Pendaftaran">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Form Tambah Informasi Pendaftaran
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Tambahkan informasi lengkap untuk pendaftaran baru
          </p>
        </div>

        {error.general && (
          <div className="p-3 mx-6 mt-4 text-red-700 bg-red-100 rounded-md">
            {error.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-gray-600">
          <div className="pb-6 border-b">
            <h3 className="mb-4 text-lg font-semibold">
              Informasi Pendaftaran
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 font-medium text-md"
                >
                  Gelombang
                </label>
                <select
                  id="nama_gelombang"
                  name="nama_gelombang"
                  value={formData.nama_gelombang}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                >
                  <option value="">Pilih Gelombang</option>
                  <option value="Gelombang 1">Gelombang 1</option>
                  <option value="Gelombang 2">Gelombang 2</option>
                  <option value="Gelombang 3">Gelombang 3</option>
                </select>
                {error.nama_gelombang && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.nama_gelombang}
                  </div>
                )}
              </div>

              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 font-medium text-md"
                >
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows={4}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  placeholder="Masukkan deskripsi informasi"
                  required
                />
                {error.deskripsi && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.deskripsi}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tahun_ajaran"
                  className="block mb-2 font-medium text-md"
                >
                  Tahun Ajaran
                </label>
                <input
                  type="text"
                  id="tahun_ajaran"
                  name="tahun_ajaran"
                  value={formData.tahun_ajaran}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  placeholder="Contoh: 2024/2025"
                  required
                />
                {error.tahun_ajaran && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.tahun_ajaran}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tanggal_mulai"
                  className="block mb-2 font-medium text-md"
                >
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  id="tanggal_mulai"
                  name="tanggal_mulai"
                  value={formData.tanggal_mulai}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                />
                {error.tanggal_mulai && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.tanggal_mulai}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tanggal_akhir"
                  className="block mb-2 font-medium text-md"
                >
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  id="tanggal_akhir"
                  name="tanggal_akhir"
                  value={formData.tanggal_akhir}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                />
                {error.tanggal_akhir && (
                  <div className="mt-2 text-sm text-red-500">
                    {error.tanggal_akhir}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 mt-6 space-x-4">
            <button
              type="button"
              onClick={() => navigate("/informasi-pendaftaran")}
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
    // <div className="">hello</div>
  );
};

export default AddInformasiPendaftaran;
