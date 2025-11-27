import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/api";
import Dashboard from "../../template/Dashboard";
import useTitle from "../../utils/useTitle";

const AddInformasiPendaftaran = () => {
  useTitle("Tambah Informasi Pendaftaran - Dashboard");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    // Validate dates
    if (new Date(formData.start_date) >= new Date(formData.end_date)) {
      setError("Tanggal selesai harus setelah tanggal mulai");
      setIsSubmitting(false);
      return;
    }

    try {
      await post("/informasi-pendaftaran/create", {
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_active: formData.is_active ? 1 : 0,
      });

      navigate("/informasi-pendaftaran", {
        state: { successMsg: "Informasi pendaftaran berhasil ditambahkan" },
      });
    } catch (err) {
      setError("Gagal menambahkan informasi pendaftaran. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dashboard title="Tambah Informasi Pendaftaran">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Form Tambah Informasi Pendaftaran</h2>
          <p className="mt-1 text-sm text-gray-600">
            Tambahkan informasi lengkap untuk pendaftaran baru
          </p>
        </div>

        {error && (
          <div className="p-3 mx-6 mt-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-gray-600">
          <div className="pb-6 border-b">
            <h3 className="mb-4 text-lg font-semibold">Informasi Pendaftaran</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 font-medium text-md"
                >
                  Judul
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  placeholder="Masukkan judul informasi"
                  required
                />
              </div>

              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 font-medium text-md"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  placeholder="Masukkan deskripsi informasi"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="start_date"
                  className="block mb-2 font-medium text-md"
                >
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="end_date"
                  className="block mb-2 font-medium text-md"
                >
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                />
              </div>

              <div className="mb-4 md:col-span-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm font-medium">Aktif</span>
                </label>
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
  );
};

export default AddInformasiPendaftaran;
