import Header from "../header/header";


const ErrorPage = () => {
    return (
        <div className="error_page-container grid grid-cols-2">
          <div className="error_page-header">
            <Header/>
          </div>
          <div className="error_page-body">
            <h1 className="error_page-title size-16">WTF MAN,WHAT THIS PAGE??!!</h1>
          </div>
        </div>
    )
}

export default ErrorPage

