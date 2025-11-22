import Menus from "./Menus"
export default function MainHeader() {
    return (
        <header className="bg-blue-600 text-white py-6 shadow-md">
            <h1 className="text-center text-3xl font-bold">Healthcare Portal</h1>
            <Menus />
        </header>
    )
}