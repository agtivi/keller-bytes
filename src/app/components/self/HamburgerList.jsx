import Link from 'next/link'

export const HamburgerList = ({setIsOpen}) => {
    const handleClick = () =>{
        setIsOpen()
    }
    return (
        <ul className="space-y-2 list-none">
            <li className="text-black">
                <Link href="/home" onClick={handleClick}>Home</Link>
            </li>
            <li className="text-black">
                <Link href="/gravity" onClick={handleClick}>Gravity</Link>
            </li>
            <li className="text-black">
                <Link href="/random-verse" onClick={handleClick}>Random Verse</Link>
            </li>
        </ul>
    );
};