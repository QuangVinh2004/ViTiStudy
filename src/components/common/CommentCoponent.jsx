
const CommentComponent = ({ comment, idx, avatar, name, rating }) => {
    return (
        <div key={idx} className="bg-white rounded-xl shadow-md px-4 py-2 flex items-center gap-4">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
            <div>
                <div className="font-semibold">{name}</div>
                <div className="flex items-center leading-tight">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-gray-600 text-[12px]">{rating}/5</span>
                </div>
                <div className="text-gray-700 text-sm">{comment}</div>
            </div>
        </div>
    );
};

export default CommentComponent;
