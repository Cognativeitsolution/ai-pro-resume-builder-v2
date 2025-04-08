import starBg from "media/builderIcons/bg-star.svg"

const AddSectionClipPath = () => {
    return (
        <>
            <div
                className="absolute right-[-6px] top-[-3px] w-[60px] h-[55px] flex items-center justify-center transition-all duration-700"
                style={{
                    backgroundImage: `url(${starBg.src})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >

            </div>
        </>
    )
}

export default AddSectionClipPath