export const dashboardConfig = {
    tenant: {
        title: "Tenant Hub",
        logoText: "TN",
        routes: [
            { label: "📊 Dashboard Overview", path: "/dashboard/tenant" },
            { label: "📋 My Bookings", path: "/dashboard/tenant/bookings" },
            { label: "❤️ Favorites", path: "/dashboard/tenant/favorites" },
            { label: "👤 Profile Settings", path: "/dashboard/tenant/profile" },
        ],
    },
    owner: {
        title: "Owner Portal",
        logoText: "OW",
        routes: [
            { label: "📊 Dashboard Overview", path: "/dashboard/owner" },
            { label: "🏠 My Properties", path: "/dashboard/owner/my-properties" },
            { label: "➕ Add Property", path: "/dashboard/owner/add-property" },
            { label: "💰 Rental Requests", path: "/dashboard/owner/booking-requests" },
            { label: "👤 Profile Settings", path: "/dashboard/owner/profile" },
        ],
    },
    admin: {
        title: "Admin Suite",
        logoText: "AD",
        routes: [
            { label: "📊 Dashboard Overview", path: "/dashboard/admin" },
            { label: "👥 Platform Users", path: "/dashboard/admin/all-users" },
            { label: "🏠 System Properties", path: "/dashboard/admin/all-properties" },
            { label: "📅 All Bookings", path: "/dashboard/admin/all-bookings" },
            { label: "🧾 Transactions Ledger", path: "/dashboard/admin/transactions" },
            { label: "👤 Profile Settings", path: "/dashboard/admin/profile" },
        ],
    },
};
