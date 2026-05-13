import React from 'react';
import { Text } from '@deriv/components';
import { LegacyReportsIcon, StandaloneCircleExclamationRegularIcon, StandaloneChartAreaRegularIcon } from '@deriv/quill-icons';
import { routes } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import { useTranslations } from '@deriv-com/translations';

import { BinaryLink } from '../../Routes';

import './menu-links.scss';

const MenuItems = ({ id, text, icon, link_to, onClick }) => {
    if (onClick) {
        return (
            <a
                id={id}
                key={text}
                onClick={onClick}
                className='header__menu-link'
            >
                <Text size='m' line_height='xs' title={text} className='header__menu-link-text'>
                    {icon}
                    {text}
                </Text>
            </a>
        );
    }
    return (
        <BinaryLink
            id={id}
            key={text}
            to={link_to}
            className='header__menu-link'
            active_class='header__menu-link--active'
        >
            <Text size='m' line_height='xs' title={text} className='header__menu-link-text'>
                {icon}
                {text}
            </Text>
        </BinaryLink>
    );
};

const ReportTab = () => {
    const { localize } = useTranslations();
    return (
        <MenuItems
            id={'dt_reports_tab'}
            icon={<LegacyReportsIcon className='header__icon' iconSize='xs' fill='var(--color-text-primary)' />}
            text={localize('Reports')}
            link_to={routes.reports}
        />
    );
};

const MenuLinks = observer(({ is_traders_hub_routes = false, onOpenDisclaimer }) => {
    const { currentLang, localize } = useTranslations();
    const { client } = useStore();
    const { is_logged_in } = client;

    return (
        <div key={`menu-links__${currentLang}`} className='header__menu-links'>
            {!is_traders_hub_routes && is_logged_in && <ReportTab />}
            <MenuItems
                id='dt_bot_trading_tab'
                icon={<StandaloneChartAreaRegularIcon className='header__icon' iconSize='xs' fill='var(--color-text-primary)' />}
                text={localize('Bot Trading')}
                onClick={() => window.open('https://dtrader.zullu.co.ke/', '_blank', 'noopener,noreferrer')}
            />
            <MenuItems
                id='dt_disclaimer_tab'
                icon={<StandaloneCircleExclamationRegularIcon className='header__icon' iconSize='xs' fill='var(--color-text-primary)' />}
                text={localize('Disclaimer')}
                onClick={onOpenDisclaimer}
            />
        </div>
    );
});

export default MenuLinks;
