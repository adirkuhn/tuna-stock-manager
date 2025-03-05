import './App.css'
import {Outlet, Link, useLocation} from "react-router-dom";
import {NAV_ROUTES} from "./routes.tsx";

function Layout() {
    const location = useLocation();
    const currentLocation = location.pathname || "/";

    console.log(location);

    return (
        <div id="tuna-stock-manager" className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex flex-wrap justify-between">
                                <img className="size-8 mt-1"
                                     src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                     alt="Tuna Stock Manager"/>
                                <Link to='/' className="text-3xl ml-2 font-normal leading-normal text-white">Tuna</Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {Object.entries(NAV_ROUTES).map(([path, { label }]) => (
                                        <Link key={path}
                                              to={path}
                                              className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                  currentLocation === path ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                              }`}
                                              aria-current={currentLocation === path ? "page" : undefined}>
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">View notifications</span>
                                    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                         stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button type="button"
                                    className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>

                                <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{NAV_ROUTES[currentLocation]?.label || '404'}</h1>
                </div>
            </header>

            <main className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
