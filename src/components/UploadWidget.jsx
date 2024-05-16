import { useEffect, useRef } from "react";

const UploadWidget = ({ value, setImageUrl, imageUrl }) => {
    const CloudinaryRef = useRef();
    const WidgetRef = useRef();

    useEffect(() => {
        CloudinaryRef.current = window.cloudinary;
        WidgetRef.current = CloudinaryRef.current.createUploadWidget({
            cloudName: 'dxhy6trsm',
            uploadPreset: 'fxounupl'
        }, (error, result) => {
            if (result && result.event === 'success') {
                const { secure_url } = result.info;
                setImageUrl(secure_url);
            } else {
                console.error('Error uploading image:', error);
            }

        });
    }, []);

    const handleOpenWidget = () => {
        WidgetRef.current.open();
    };

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="w-screen flex justify-center gap-5 ">
                <button onClick={handleOpenWidget} className="text-[10px] sm:text-[20px] bg-blue-600 text-white rounded px-4 py-2 ">Upload</button>
                {imageUrl && <button onClick={()=>{setImageUrl(null)}} className="text-[10px] sm:text-[20px] bg-blue-600 text-white rounded px-4 py-2 ">Delete</button>}
            </div>
            {imageUrl && <img src={imageUrl} alt="Uploaded" className=' w-[30%] mt-[20px]' />}
        </div>
    );
}

export default UploadWidget;
