// OAuthSuccessPage.jsx
// Called after Google OAuth redirect: /oauth-success?token=...
import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function OAuthSuccessPage() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            try {
                // Decode the JWT to get user info
                const decoded = jwtDecode(token);

                const user = {
                    id: decoded.id,
                    email: decoded.email,
                    role: decoded.role,
                    name: decoded.name || decoded.email,
                };

                // Persist token & user
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                // Update AuthContext
                setUser(user);

                // Redirect based on role
                if (decoded.role === "admin") {
                    navigate("/dashboard", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            } catch (err) {
                console.error("OAuth token decode error:", err);
                navigate("/login", { replace: true });
            }
        } else {
            // No token → back to login
            navigate("/login", { replace: true });
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Signing you in with Google...</p>
            </div>
        </div>
    );
}
