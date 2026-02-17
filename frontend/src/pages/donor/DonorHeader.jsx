export function DonorHeader( {full_name} ){
    return(
        <header>
                    <h1>Donor Dashboard</h1>
                    <div className="user-info">
                        <p>Welcome, {full_name || "Biren"}</p>
                        {/* <button className="btn-secondary">Logout</button> */}
                    </div>
        </header>
    );
}