import Link from 'next/link'

export const HamburgerList = () => {
    return (
        <ul className="space-y-2 list-none">
            <li className="text-black">
                <Link href="/home">Home</Link>
            </li>
            <li className="text-black">
                <Link href="/gravity">Gravity</Link>
            </li>
            <li className="text-black">Item 3</li>
        </ul>
    );
};