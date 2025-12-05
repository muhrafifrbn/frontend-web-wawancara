import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";
import formatTimeForInput from "../../utils/formatTimeForInput";

const EditJadwalTes = ({ id, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [gelombangOptions, setGelombangOptions] = useState([]);
  const [loadingGelombang, setLoadingGelombang] = useState(true);
  const [errorGelombang, setErrorGelombang] = useState("");

  // 🔹 Ambil data jadwal by id
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/information/schedule-test/${id}`);
        console.log("Detail jadwal tes:", response.data);

        let infoRuanganDefault = {
          tes_kesehatan: "",
          wawancara: "",
          psikotes: "",
          tes_komputer: "",
        };

        //  PARSE informasi_ruangan dari STRING JSON → OBJECT
        if (response.data.informasi_ruangan) {
          try {
            const raw = response.data.informasi_ruangan;
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

            infoRuanganDefault = {
              ...infoRuanganDefault,
              ...parsed,
            };
          } catch (err) {
            console.error(
              "Gagal parse informasi_ruangan di edit:",
              err,
              response.data.informasi_ruangan
            );
          }
        }

        setFormData({
          ...response.data,
          informasi_ruangan: infoRuanganDefault,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // 🔹 Ambil list gelombang
  useEffect(() => {
    const fetchGelombang = async () => {
      try {
        setLoadingGelombang(true);
        setErrorGelombang("");

        const response = await get("/information/registration");
        setGelombangOptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorGelombang("Gagal memuat data gelombang");
      } finally {
        setLoadingGelombang(false);
      }
    };

    fetchGelombang();

    const handleFocus = () => {
      fetchGelombang();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // 🔹 Handle input changes (termasuk nested informasi_ruangan.xxx)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // nested: informasi_ruangan.tes_kesehatan, dll
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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);

    try {
      if (!formData) return;

      // CONVERT informasi_ruangan OBJECT → STRING JSON sebelum kirim ke BE
      const dataToSubmit = {
        ...formData,
        informasi_ruangan: JSON.stringify(formData.informasi_ruangan),
      };

      dataToSubmit.tanggal_tes = formatDateForInput(dataToSubmit.tanggal_tes);
      dataToSubmit.jam_mulai = formatTimeForInput(dataToSubmit.jam_mulai);
      dataToSubmit.jam_selesai = formatTimeForInput(dataToSubmit.jam_selesai);

      console.log("Data dikirim (update):", dataToSubmit);

      await put(`/information/schedule-test/update/${id}`, dataToSubmit);
      onUpdate();
      setMessage("Data berhasil diupdate");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      if (error.response && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const formattedErrors = {};
        serverErrors.forEach((err) => {
          formattedErrors[err.path] = err.msg;
        });
        setMessage("Data gagal diupdate");
        setErrors(formattedErrors);
        // console.log(formData);
      } else {
        setErrors({ general: "Gagal menyimpan data. Silakan coba lagi." });
      }
      // console.log(dataToSubmit);
    } finally {
      setSaving(false);
    }
  };

  const primaryButton = (
    <button
      onClick={handleSubmit}
      disabled={saving}
      className="w-full px-5 py-2 text-sm font-semibold text-center text-white bg-red-500 rounded-md active:scale-95 focus:outline-none"
    >
      {saving ? "Menyimpan..." : "Simpan"}
    </button>
  );

  const secondaryButton = (
    <button
      onClick={onClose}
      className="w-full px-5 py-2 text-sm font-semibold text-center text-red-500 bg-white border-2 border-red-500 rounded-md active:scale-95 focus:outline-none"
    >
      Batal
    </button>
  );

  if (loading || !formData) return <LoadingSpinner />;

  return (
    <ModalContainer
      title="Edit Data Jadwal Tes"
      subtitle="Edit informasi Jadwal Tes"
      onClose={onClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      msg={message}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Tanggal Tes */}
          <div>
            <label
              htmlFor="tanggal_tes"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Tes
            </label>
            <input
              type="date"
              id="tanggal_tes"
              name="tanggal_tes"
              value={
                formData?.tanggal_tes
                  ? formatDateForInput(formData.tanggal_tes)
                  : ""
              }
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${errors?.tanggal_tes ? "ring-red-500 border-red-500" : ""} 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              required
            />
            {errors.tanggal_tes && (
              <div className="mt-2 text-sm text-red-500">
                {errors.tanggal_tes}
              </div>
            )}
          </div>

          {/* Jam Mulai */}
          <div>
            <label
              htmlFor="jam_mulai"
              className="block text-sm font-medium text-gray-700"
            >
              Jam Mulai
            </label>
            <input
              type="time"
              id="jam_mulai"
              name="jam_mulai"
              value={formData?.jam_mulai || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${errors?.jam_mulai ? "ring-red-500 border-red-500" : ""} 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              required
            />
            {errors.jam_mulai && (
              <div className="mt-2 text-sm text-red-500">
                {errors.jam_mulai}
              </div>
            )}
          </div>

          {/* Jam Selesai */}
          <div>
            <label
              htmlFor="jam_selesai"
              className="block text-sm font-medium text-gray-700"
            >
              Jam Selesai
            </label>
            <input
              type="time"
              id="jam_selesai"
              name="jam_selesai"
              value={formData?.jam_selesai || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${errors?.jam_selesai ? "ring-red-500 border-red-500" : ""} 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              required
            />
            {errors.jam_selesai && (
              <div className="mt-2 text-sm text-red-500">
                {errors.jam_selesai}
              </div>
            )}
          </div>

          {/* Informasi Ruangan Tes Kesehatan */}
          <div className="col-span-2">
            <label
              htmlFor="informasi_ruangan.tes_kesehatan"
              className="block text-sm font-medium text-gray-700"
            >
              Informasi Ruangan Tes Kesehatan
            </label>
            <input
              type="text"
              id="informasi_ruangan.tes_kesehatan"
              name="informasi_ruangan.tes_kesehatan"
              value={formData.informasi_ruangan.tes_kesehatan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Contoh: Ruang 101, Lantai 2"
              required
            />
          </div>

          {/* Informasi Ruangan Wawancara */}
          <div className="col-span-2">
            <label
              htmlFor="informasi_ruangan.wawancara"
              className="block text-sm font-medium text-gray-700"
            >
              Informasi Ruangan Wawancara
            </label>
            <input
              type="text"
              id="informasi_ruangan.wawancara"
              name="informasi_ruangan.wawancara"
              value={formData.informasi_ruangan.wawancara || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${
                      errors?.informasi_ruangan
                        ? "ring-red-500 border-red-500"
                        : ""
                    } 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              placeholder="Contoh: Ruang 101, Lantai 2"
              required
            />
            {errors.informasi_ruangan && (
              <div className="mt-2 text-sm text-red-500">
                {errors.informasi_ruangan}
              </div>
            )}
          </div>

          {/* Informasi Ruangan Psikotes */}
          <div className="col-span-2">
            <label
              htmlFor="informasi_ruangan.psikotes"
              className="block text-sm font-medium text-gray-700"
            >
              Informasi Ruangan Psikotes
            </label>
            <input
              type="text"
              id="informasi_ruangan.psikotes"
              name="informasi_ruangan.psikotes"
              value={formData.informasi_ruangan.psikotes || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${
                      errors?.informasi_ruangan
                        ? "ring-red-500 border-red-500"
                        : ""
                    } 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              placeholder="Contoh: Ruang 101, Lantai 2"
              required
            />
            {errors.informasi_ruangan && (
              <div className="mt-2 text-sm text-red-500">
                {errors.informasi_ruangan}
              </div>
            )}
          </div>

          {/* Informasi Ruangan Tes Komputer (TIK) */}
          <div className="col-span-2">
            <label
              htmlFor="informasi_ruangan.tes_komputer"
              className="block text-sm font-medium text-gray-700"
            >
              Informasi Ruangan Tes Komputer (TIK)
            </label>
            <input
              type="text"
              id="informasi_ruangan.tes_komputer"
              name="informasi_ruangan.tes_komputer"
              value={formData.informasi_ruangan.tes_komputer || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${
                      errors?.informasi_ruangan
                        ? "ring-red-500 border-red-500"
                        : ""
                    } 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              placeholder="Contoh: Ruang 101, Lantai 2"
              required
            />
            {errors.informasi_ruangan && (
              <div className="mt-2 text-sm text-red-500">
                {errors.informasi_ruangan}
              </div>
            )}
          </div>

          {/* id_gelombang */}
          <div className="col-span-2">
            <label
              htmlFor="id_gelombang"
              className="block text-sm font-medium text-gray-700"
            >
              ID Gelombang
            </label>
            {errorGelombang && (
              <p className="mb-1 text-xs text-red-600">{errorGelombang}</p>
            )}
            <select
              id="id_gelombang"
              name="id_gelombang"
              value={formData.id_gelombang || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${
                      errors?.informasi_ruangan
                        ? "ring-red-500 border-red-500"
                        : ""
                    } 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              required
              disabled={loadingGelombang}
            >
              <option value="" disabled>
                {loadingGelombang
                  ? "Memuat data gelombang..."
                  : "Pilih Gelombang"}
              </option>
              {gelombangOptions.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nama_gelombang}
                </option>
              ))}
            </select>
            {errors.id_gelombang && (
              <div className="mt-2 text-sm text-red-500">
                {errors.id_gelombang}
              </div>
            )}
          </div>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditJadwalTes;
