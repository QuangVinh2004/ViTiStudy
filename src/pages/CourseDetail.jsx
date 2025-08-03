
import { ListItemLayout, LessonsCardComponent,LessonItem } from "../components/layouts";
import { LogoComponent } from "../components/common";
function CoursePage() {
    return (
        <div className=" max-w-7xl mx-auto py-10 px-4">
            <LogoComponent className="w-[200px]" />
            <div className="flex gap-6 mt-12">

                <div className="w-[36%] border p-4 bg-slate-50 rounded-lg shadow max-h-[500px]">
                    <ListItemLayout direction="vertical">
                        <LessonsCardComponent
                            chapterTitle={"Khái quát chung về Việt Nam"}
                            lessonCount={"3 bài học"}
                        >
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                        </LessonsCardComponent>
                         <LessonsCardComponent
                            chapterTitle={"Khái quát chung về Việt Nam"}
                            lessonCount={"3 bài học"}
                        >
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                        </LessonsCardComponent>
                         <LessonsCardComponent
                            chapterTitle={"Khái quát chung về Việt Nam"}
                            lessonCount={"3 bài học"}
                        >
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                        </LessonsCardComponent>
                         <LessonsCardComponent
                            chapterTitle={"Khái quát chung về Việt Nam"}
                            lessonCount={"3 bài học"}
                        >
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                           <LessonItem 
                           title="Vị trí địa lý và phạm vi lãnh thổ "
                           duration="45 phút"
                           /> 
                        </LessonsCardComponent>
                    </ListItemLayout>
                    
                </div>


                <div className="flex-1 ml-4">
                    <iframe
                        width="100%"
                        height="500"
                        src="https://www.youtube.com/embed/nmKTlmByng0?list=RDnmKTlmByng0"
                        title="Video"
                        allowFullScreen
                        className="rounded-xl"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default CoursePage;
