
const ErrorPage = ({ title, message }) => {
    return (
        <div style={{ textAlign: 'center', color: "darksalmon" }}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage