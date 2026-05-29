import Header from "../header/header";


const ErrorPage = () => {
    return (
        <div className="error_page-container grid grid-cols-2">
          <div className="error_page-header">
            <Header/>
          </div>
          <div className="error_page-body grid">
            <h1 className="error_page-title size-64 accent-red-500">Wrong page!</h1>
            <h1 className="size-32 accent-black-500">404</h1>
          </div>
        </div>
    )
}

export default ErrorPage
