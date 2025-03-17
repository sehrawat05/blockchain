import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from "../store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { mintNFT } from "../Blockchain.Services";
const CreateNFT = () => {
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [imgBase64, setImgBase64] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !description || !fileUrl) return;

    setGlobalState("modal", "scale-0");
    setGlobalState("loading", { show: true, msg: "Uploading to IPFS using Pinata..." });

    try {
      const formData = new FormData();
      formData.append('file', fileUrl);

      const metadata = JSON.stringify({
        name: title,
        keyvalues: {
          price,
          description,
        },
      });

      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });

      formData.append('pinataOptions', options);

      // ✅ Use Pinata API directly
      const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          pinata_api_key: 'bf73ef35ba5a2f7f58db',
          pinata_secret_api_key: '63cbb0a02f319dc8f04542abc0b138fbe9ae470e603c41e84936e03dfef08001',
        },
        body: formData,
      });

      if (!res.ok) throw new Error(`Failed to upload: ${res.statusText}`);

      const data = await res.json();
      const metadataURI = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;

      const nft = { title, price, description, metadataURI };

      setLoadingMsg("Initializing transaction...");
      setFileUrl(metadataURI);
      await mintNFT(nft);

      resetForm();
      setAlert("Minting completed...", "green");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      setAlert("Minting failed...", "red");
    }
  };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const closeModal = () => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };

  const resetForm = () => {
    setFileUrl("");
    setImgBase64(null);
    setTitle("");
    setPrice("");
    setDescription("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400">Add NFT</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={
                  imgBase64 ||
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop&w=1361&q=80"
                }
              />
            </div>
          </div>

          <div className="mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={changeImage}
              className="bg-gray-800 rounded-xl w-full px-4 py-2 text-white cursor-pointer"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 rounded-xl w-full px-4 py-2 mt-3 text-white"
            required
          />

          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Price (ETH)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-800 rounded-xl w-full px-4 py-2 mt-3 text-white"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-800 rounded-xl w-full px-4 py-2 mt-3 text-white"
            required
          ></textarea>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#e32970] hover:bg-[#bd255f] text-white rounded-xl w-full px-4 py-2 mt-5"
          >
            Mint Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
