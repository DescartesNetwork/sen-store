import { useWalletAddress, util } from '@sentre/senhub'

const useWalletConnected = () => {
  const walletAddress = useWalletAddress()
  return util.isAddress(walletAddress)
}

export default useWalletConnected
