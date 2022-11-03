import BreakSpace from "../../../components/share/BreakSpace";
import BlogBox from "../../../components/share/BlogBox";
import HeaderBar from "../../../components/Guest/HeaderBar";
import HeaderImage from "../../../components/share/HeaderImage";


export default function Blog(){
    return(
        <div className="blog-page-container">
            <HeaderBar/>
            <HeaderImage img= "/assets/images/headerimg.jpg" title="Blog"/>
            <BreakSpace h="30px"/>
            <div className="container">
                <div className="row-hh">
                    <div className="col-8 list-blog">
                        <BlogBox/>
                        <BlogBox/>
                        <BlogBox/>
                    </div>

                    <div className="col-4 right-bar">

                    </div>

                </div>
            </div>
            <BreakSpace h="30px"/>
        </div>
    );
}