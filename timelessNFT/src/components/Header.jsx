import timelessLogo from '../assets/timeless.png'
import { connectWallet } from '../Blockchain.Services'
import { useGlobalState } from '../store'
function Header() {
  const truncate = (str, startLength, endLength, maxLength) => {
    if (!str) return '';
    if (str.length > maxLength) {
      return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
    }
    return str;
  };
  // ', '
  const [connectedAccount]=useGlobalState('connectedAccount')

  return (
    <div className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img className='w-32 cursor-pointer' src={timelessLogo} alt="logo" />
      </div>
      <ul className='md:flex-[0.5] text-white md:flex hidden list-none justify-between items-center flex-initial'>
        <li className='mx-4 cursor-pointer'>Market</li>
        <li className='mx-4 cursor-pointer'>Artist</li>
        <li className='mx-4 cursor-pointer'>Features</li>
        <li className='mx-4 cursor-pointer'>Community</li>
      </ul>
      {connectedAccount?(
        <button className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full' onClick={connectWallet}>
        {truncate(connectedAccount,4,4,11)}
      </button>
      ):(
        <button className='shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full' onClick={connectWallet}>
        Connect Wallet
      </button>
      )}
    </div>
  )
}

export default Header