import React, { useState } from 'react'
import { useMoralis, useWeb3Transfer } from 'react-moralis'
import Select from 'react-select'
import { useParams } from 'react-router-dom'

const options = [
  {
    id: 1,
    label: 'Tree Charity',
    value: '0x0d2c03D0643C3372F58c13c1391C2ae469149762',
  },
  {
    id: 2,
    label: 'Ocean Charity',
    value: '0x0d2c03D0643C3372F58c13c1391C2ae469149762',
  },
  {
    id: 3,
    label: 'Dog Charity',
    value: '0x0d2c03D0643C3372F58c13c1391C2ae469149762',
  },
]

const DonateEth = function ({
  eth,
  recipient,
}: {
  eth: number
  recipient: string | null | undefined
}): JSX.Element {
  const { Moralis } = useMoralis()

  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(eth),
    receiver: recipient || '0x',
    type: 'native',
  })

  return (
    <div>
      {error && <div className="text-danger">{error.message}</div>}
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => fetch()}
        disabled={isFetching}
      >
        Transfer
      </button>
    </div>
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

  const [eth, setEth] = useState<string>('0')

  const handleEthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement
    setEth(target.value)
  }

  return (
    <div className="container-sm h-100">
      <h1 className="text-danger">ONLY USE ON KOVAN TEST NETWORK</h1>
      <h4 className="text-danger">
        YOU WILL LOSE YOUR MONEY IF YOUR METAMASK IS ON MAINNET
      </h4>
      <div className="row h-100 mt-5 w-50 justify-content-center">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <input
                  className="mb-3 form-control"
                  type="text"
                  placeholder="ETH"
                  value={eth}
                  onChange={handleEthChange}
                />
                <Select
                  className="mb-3"
                  options={options}
                  onChange={(selectedOption) => setCharity(selectedOption)}
                  value={charity}
                />
                <DonateEth
                  eth={parseInt(eth, 10) || 0}
                  recipient={charity?.value}
                />
              </div>
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
