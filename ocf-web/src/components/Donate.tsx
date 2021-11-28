import React, { useState } from 'react'
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useWeb3Transfer,
} from 'react-moralis'
import Select from 'react-select'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import contractAbi from '../abi/DonationCollectorKeeper'

const options = [
  {
    id: 1,
    label: 'Clean Water',
    value: '0xDB2EEC439E37D00652FE815Eaa00D51C1819B865',
  },
  {
    id: 2,
    label: 'Code Plus',
    value: '0x',
  },
  {
    id: 3,
    label: 'Furry Friends',
    value: '0x',
  },
]

const DonateEth = function ({
  link,
  recipient,
  resetDonation,
}: {
  link: number
  recipient: string | null | undefined
  resetDonation: () => void
}): JSX.Element {
  const { Moralis } = useMoralis()

  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(link),
    receiver: recipient || '0x',
    type: 'erc20',
    contractAddress: '0xa36085F69e2889c224210F603D836748e7dC0088',
  })

  const { fetch: swapFetch, isFetching: swapIsFetching } =
    useWeb3ExecuteFunction({
      abi: contractAbi,
      contractAddress: '0xDB2EEC439E37D00652FE815Eaa00D51C1819B865',
      functionName: 'swap',
      params: {
        _tokenIn: '0xa36085F69e2889c224210F603D836748e7dC0088',
        _tokenOut: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
        _amountIn: Moralis.Units.Token(link, 18),
        _amountOutMin: 10,
        _to: '0xDB2EEC439E37D00652FE815Eaa00D51C1819B865',
      },
    })

  return (
    <>
      {error && <span className="text-danger">{error}</span>}
      <div>
        <button
          className="btn btn-primary w-100"
          type="button"
          onClick={() => {
            fetch()
            setTimeout(() => {
              swapFetch()
              resetDonation()
            }, 10000)
          }}
          disabled={isFetching || swapIsFetching}
        >
          Transfer
        </button>
      </div>
    </>
  )
}

const Donate = function (): JSX.Element {
  const { charityId } = useParams()

  const [charity, setCharity] = useState<{
    id: number
    label: string
    value: string
  } | null>(
    options.find((item) =>
      charityId ? item.id === parseInt(charityId, 10) : null
    ) || null
  )

  const [link, setLink] = useState<string>('0')

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement
    setLink(target.value)
  }

  return (
    <div className="container-sm h-100 w-25">
      <div className="min-vh-100 mt-5">
        <div className="card shadow" style={{ borderRadius: '15px' }}>
          <div className="card-title text-center mt-2 mb-0 pb-0">
            <h3>Donate</h3>
          </div>
          <div className="card-body pt-0">
            <div className="form-group">
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="LINK"
                  value={link}
                  onChange={handleLinkChange}
                />
                <span className="input-group-text">LINK</span>
              </div>
              <div className="d-flex justify-content-center">
                <FontAwesomeIcon
                  className="text-primary text-center mb-3"
                  size="2x"
                  icon={faArrowDown}
                />
              </div>
              <Select
                className="mb-3"
                options={options}
                onChange={(selectedOption) => setCharity(selectedOption)}
                value={charity}
              />
              <DonateEth
                link={parseInt(link, 10) || 0}
                recipient={charity?.value}
                resetDonation={() => setLink('0')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Donate.defaultProps = {
  charityId: null,
}

export default Donate
