import Image from 'next/image';
import moment from 'moment';

export const dataSource = [
    {
        protocol: { src: '/fluid.svg', alt: 'Fluid', label: 'Fluid', size: 40 },
        network: { src: '/eth.svg', alt: 'Ethereum', label: 'Ethereum', size: 16 },
        amount: { fusdt: 2.017, usdt: -70.54 },
        investedProducts: '2',
        assets: '$7.73',
        date: Date.now(),
    },
    {
        protocol: { src: '/fluid.svg', alt: 'Fluid', label: 'Fluid', size: 40 },
        network: { src: '/eth.svg', alt: 'Ethereum', label: 'Ethereum', size: 16 },
        amount: { fusdt: 2.017, usdt: -70.54 },
        investedProducts: '2',
        assets: '$7.73',
        date: Date.now(),
    },
    {
        protocol: { src: '/fluid.svg', alt: 'Fluid', label: 'Fluid', size: 40 },
        network: { src: '/eth.svg', alt: 'Ethereum', label: 'Ethereum', size: 16 },
        amount: { fusdt: 2.017, usdt: -70.54 },
        investedProducts: '2',
        assets: '$7.73',
        date: Date.now(),
    },
];

export const baseColumns = [
    {
        title: 'Protocol',
        dataIndex: 'protocol',
        key: 'protocol',
        render: (value: any) => (
            <div className="flex items-center space-x-4">
                <Image src={value.src} alt={value.alt} width={value.size || 40} height={value.size || 40} />
                <span>{value.label}</span>
            </div>
        ),
    },
    {
        title: 'Network',
        dataIndex: 'network',
        key: 'network',
        render: (value: any) => (
            <div className="flex items-center space-x-2">
                <Image src={value.src} alt={value.alt} width={value.size || 16} height={value.size || 16} />
                <span>{value.label}</span>
            </div>
        ),
    },
]

export const transactionsColumns = [
    ...baseColumns,
    {
        title: (
            <span className='flex items-center justify-end'>Amount</span>
        ),
        dataIndex: 'amount',
        key: 'amount',
        render: (value: any) => (
            <div className="w-full flex flex-col items-end justify-center gap-[2px]">
                <span className="text-success text-coinSm font-500">
                    {value.fusdt} FUSDT
                </span>
                <span className="text-secondary text-[13px] font-500">
                    {value.usdt} USDT
                </span>
            </div>
        ),
    },
    {
        title: (
            <span className='flex items-center justify-end'>Date</span>
        ),
        dataIndex: 'date',
        key: 'date',
        render: (value: any) => (
            <span className='w-full text-secondary flex items-center justify-end'>{moment(value).format('YYYY/MM/DD HH:mm')}</span>
        ),
    },
]

export const defiColumns = [
    ...baseColumns,
    {
        title: 'Invested products',
        dataIndex: 'investedProducts',
        key: 'investedProducts',
    },
    {
        title: 'Assets',
        dataIndex: 'assets',
        key: 'assets',
    },
]

export const DetailColumns = [
    {
        title: 'Protocol',
        dataIndex: 'protocol',
        key: 'protocol',
        render: (value: any) => (
            <div className="flex items-center space-x-4">
                <Image src={value.src} alt={value.alt} width={value.size || 40} height={value.size || 40} />
                <span>{value.label}</span>
            </div>
        ),
    },
    {
        title: 'Assets',
        dataIndex: 'assets',
        key: 'assets',
    },
    {
        title: 'Claimable rewards',
        dataIndex: 'claimableRewards',
        key: 'claimableRewards',
        render: (value: any) => (
            <span className='text-primary'>{value}</span>
        )
    },
    {
        title: 'Total value',
        dataIndex: 'totalValue',
        key: 'totalValue',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (value: any) => (
            <div className='bg-[#0D0D0D] text-thirdary py-[11px] px-[22px] rounded-[30px] curosr-pointer button-hover' onClick={() => handleRedeem(value)}>Redeem</div>
        )
    }
]

const handleRedeem = (value: any) => { }

export const switchColumns = (type: 'defi' | 'transactions' | 'detail') => {
    switch (type) {
        case 'defi':
            return defiColumns;
        case 'transactions':
            return transactionsColumns;
        case 'detail':
        default:
            return DetailColumns
    }
}