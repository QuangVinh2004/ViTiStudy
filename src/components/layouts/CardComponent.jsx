import React from "react";

const CardComponent = ({
    title,
    description,
    imageUrl,
    rating,
    type = "simple",
    price,
    teacherImage,
    teacherName,
    lessonCount,
    onClick,
}) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            onClick={onClick}
        >
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{title}</h2>
                <p className="text-gray-700 mb-1">{description}</p>

                {type === "detail" && (
                    <>
                        <div className="flex items-center justify-between mb-1">
                            <div className="mb-2 text-blue-400 font-bold text-2xl">
                                {typeof price === "number"
                                    ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                                    : price}
                            </div>
                            {
                                rating !== undefined && (
                                    <div className="flex items-center mb-2">
                                        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
                                        <span className={"text-yellow-400"}>★</span>
                                    </div>
                                )
                            }

                        </div>
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                                <img src={teacherImage} alt={teacherName} className="w-8 h-8 rounded-full mr-2" />
                                <span className="font-medium">{teacherName}</span>
                            </div>
                            <div className="text-sm text-gray-500">Số bài học: {lessonCount}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CardComponent;