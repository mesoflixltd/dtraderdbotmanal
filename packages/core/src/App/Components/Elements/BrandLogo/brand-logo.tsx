// [AI]
import React from 'react';
import { observer } from 'mobx-react-lite';
import { getBrandLogo, getBrandLogoDark, getBrandName } from '@deriv/shared';
import { useStore } from '@deriv/stores';

type TBrandLogoProps = {
    className?: string;
    width?: number | string;
    height?: number | string;
};

const BrandLogo = observer(({ className, width, height }: TBrandLogoProps) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }} className={className}>
            <span style={{ color: '#000000', fontSize: '1.2rem', fontWeight: 'bold' }}>Zullu</span>
            <span style={{ color: '#e21e26', fontSize: '1.2rem', fontWeight: 'bold' }}>.co.ke</span>
        </div>
    );
});

BrandLogo.displayName = 'BrandLogo';

export default BrandLogo;
// [/AI]
