export function DonorHeader({ full_name }) {
    return (
        <header>
            <h1>Donor Dashboard</h1>
            <div className="user-info">
                <p>Welcome, <span className="header-name">{full_name || "Guest"}</span></p>
            </div>
        </header>
    );
}