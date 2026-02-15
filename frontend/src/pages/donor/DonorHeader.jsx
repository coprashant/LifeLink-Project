export function DonorHeader( {name} ){
    return(
        <header>
                    <h1>Donor Dashboard</h1>
                    <div className="user-info">
                        <p>Welcome, {name || "Guest"}</p>
                        <button className="btn-secondary">Logout</button>
                    </div>
        </header>
    );
}