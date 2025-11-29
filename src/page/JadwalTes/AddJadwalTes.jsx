import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post, get } from "../../utils/api";
import Dashboard from "../../template/Dashboard";
import useTitle from "../../utils/useTitle";

const AddJadwalTes = () => {
  useTitle("Tambah Informasi Pendaftaran - Dashboard");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tanggal_tes: "",
    jam_mulai: "",
    jam_selesai: "",
    informasi_ruangan: {
      tes_kesehatan: "",
      wawancara: "",
      psikotes: "",
      tes_komputer: "",
    },
    id_gelombang: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  //   Untuk gelombang
  const [gelombangOptions, setGelombangOptions] = useState([]);
  const [loadingGelombang, setLoadingGelombang] = useState(true);
  const [errorGelombang, setErrorGelombang] = useState("");

  useEffect(() => {
    const fetchGelombang = async () => {
      try {
        setLoadingGelombang(true);
        setErrorGelombang("");

        const response = await get("/information/registration");

        setGelombangOptions(response.data);
        console.log("Data gelombang:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorGelombang("Gagal memuat data gelombang");
      } finally {
        setLoadingGelombang(false);
      }
    };

    // pertama kali komponen kebuka -> fetching
    fetchGelombang();

    // setiap kali window/tab ini balik fokus -> fetch lagi
    const handleFocus = () => {
      fetchGelombang();
    };

    window.addEventListener("focus", handleFocus);

    // bersihin event listener pas komponen ga dipake lagi (unmount)
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("informasi_ruangan.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        informasi_ruangan: {
          ...prev.informasi_ruangan,
          [key]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    console.log(formData);

    try {
      //  DI SINI CONVERT OBJECT -> STRING JSON
      const payload = {
        tanggal_tes: formData.tanggal_tes,
        jam_mulai: formData.jam_mulai,
        jam_selesai: formData.jam_selesai,
        informasi_ruangan: JSON.stringify(formData.informasi_ruangan),
        
        // ini tambahan: kirim ke BE jadi string JSON
        id_gelombang: formData.id_gelombang,
      };

      await post("/information/schedule-test/create", payload);

      navigate("/jadwal-tes", {
        state: { successMsg: "Informasi jadwal berhasil ditambahkan" },
      });
    } catch (err) {
      setError(
        "Gagal menambahkan informasi jadwal pendaftaran. Silakan coba lagi."
      );
      console.log(formData);
      console.log(err);
      setIsSubmitting(false);
    }
  };

  return (
    <Dashboard title="Tambah Jadwal Tes">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Form Tambah Jadwal Tes</h2>
          <p className="mt-1 text-sm text-gray-600">
            Tambahkan informasi jadwal tes untuk gelombang pendaftaran
          </p>
        </div>

        {error && (
          <div className="p-3 mx-6 mt-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-gray-600">
          <div className="pb-6 border-b">
            <h3 className="mb-4 text-lg font-semibold">Informasi Jadwal Tes</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Tanggal Tes */}
              <div className="mb-4">
                <label
                  htmlFor="tanggal_tes"
                  className="block mb-2 font-medium text-md"
                >
                  Tanggal Tes
                </label>
                <input
                  type="date"
                  id="tanggal_tes"
                  name="tanggal_tes"
                  value={formData.tanggal_tes}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                />
              </div>

              {/* Jam Mulai */}
              <div className="mb-4">
                <label
                  htmlFor="jam_mulai"
                  className="block mb-2 font-medium text-md"
                >
                  Jam Mulai
                </label>
                <input
                  type="time"
                  id="jam_mulai"
                  name="jam_mulai"
                  value={formData.jam_mulai}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                />
              </div>

              {/* Jam Selesai */}
              <div className="mb-4">
                <label
                  htmlFor="jam_selesai"
                  className="block mb-2 font-medium text-md"
                >
                  Jam Selesai
                </label>
                <input
                  type="time"
                  id="jam_selesai"
                  name="jam_selesai"
                  value={formData.jam_selesai}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                />
              </div>

              {/* Informasi Ruangan Tes Kesehatan */}
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="informasi_ruangan.tes_kesehatan"
                  className="block mb-2 font-medium text-md"
                >
                  Informasi Ruangan Tes Kesehatan
                </label>
                <input
                  type="text"
                  id="informasi_ruangan.tes_kesehatan"
                  name="informasi_ruangan.tes_kesehatan"
                  value={formData.informasi_ruangan.tes_kesehatan}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  placeholder="Contoh: Ruang 101, Lantai 2"
                  required
                />
              </div>

              {/* Informasi Ruangan Wawancara */}
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="informasi_ruangan.wawancara"
                  className="block mb-2 font-medium text-md"
                >
                  Informasi Ruangan Wawancara
                </label>
                <input
                  type="text"
                  id="informasi_ruangan.wawancara"
                  name="informasi_ruangan.wawancara"
                  value={formData.informasi_ruangan.wawancara}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  placeholder="Contoh: Ruang 201, Lantai 3"
                  required
                />
              </div>

              {/* Informasi Ruangan Psikotes */}
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="informasi_ruangan.psikotes"
                  className="block mb-2 font-medium text-md"
                >
                  Informasi Ruangan Psikotes
                </label>
                <input
                  type="text"
                  id="informasi_ruangan.psikotes"
                  name="informasi_ruangan.psikotes"
                  value={formData.informasi_ruangan.psikotes}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  placeholder="Contoh: Ruang 301, Lantai 4"
                  required
                />
              </div>

              {/* Informasi Ruangan Tes Komputer (TIK) */}
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="informasi_ruangan.tes_komputer"
                  className="block mb-2 font-medium text-md"
                >
                  Informasi Ruangan Tes Komputer (TIK)
                </label>
                <input
                  type="text"
                  id="informasi_ruangan.tes_komputer"
                  name="informasi_ruangan.tes_komputer"
                  value={formData.informasi_ruangan.tes_komputer}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  placeholder="Contoh: Lab Komputer, Lantai 2"
                  required
                />
              </div>

              {/* Gelombang (id_gelombang) */}
              <div className="mb-4 md:col-span-2">
                <label
                  htmlFor="id_gelombang"
                  className="block mb-2 font-medium text-md"
                >
                  Gelombang
                </label>

                {errorGelombang && (
                  <p className="mb-2 text-sm text-red-600">{errorGelombang}</p>
                )}

                <select
                  id="id_gelombang"
                  name="id_gelombang"
                  value={formData.id_gelombang}
                  onChange={handleChange}
                  className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5 h-12"
                  required
                  disabled={loadingGelombang}
                >
                  <option value="">
                    {loadingGelombang
                      ? "Memuat data gelombang..."
                      : "Pilih Gelombang"}
                  </option>

                  {gelombangOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_gelombang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 mt-6 space-x-4">
            <button
              type="button"
              onClick={() => navigate("/jadwal-tes")}
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

export default AddJadwalTes;
