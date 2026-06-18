export const dashboardConfig = {
    tenant: {
        title: "Tenant Hub",
        logoText: "TN",
        routes: [
            { label: "📋 My Bookings", path: "/dashboard/tenant/bookings" },
            { label: "❤️ Favorites", path: "/dashboard/tenant/favorites" },
            { label: "👤 Profile Settings", path: "/dashboard/tenant/profile" },
        ],
    },
    owner: {
        title: "Owner Portal",
        logoText: "OW",
        routes: [
            { label: "🏠 My Properties", path: "/dashboard/owner/properties" },
            { label: "➕ Add Property", path: "/dashboard/owner/add-property" },
            { label: "💰 Rental Requests", path: "/dashboard/owner/requests" },
            { label: "👤 Profile Settings", path: "/dashboard/owner/profile" },
        ],
    },
    admin: {
        title: "Admin Suite",
        logoText: "AD",
        routes: [
            { label: "📊 Overview Stats", path: "/dashboard/admin/overview" },
            { label: "🛡️ Manage Users", path: "/dashboard/admin/users" },
            { label: "✅ Approve Properties", path: "/dashboard/admin/properties" },
            { label: "👤 Profile Settings", path: "/dashboard/admin/profile" },
        ],
    },
};