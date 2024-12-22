import { Link } from "react-router-dom";

function HomeGuest(){
    return(
        <div>
            <h2>Home Guest</h2>
            
            <Link to="/login">Đăng nhập</Link>
        </div>
    )
}

export default HomeGuest;