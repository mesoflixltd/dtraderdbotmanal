import React from 'react';
import classNames from 'classnames';

import { observer, useStore } from '@deriv/stores';
import { useDevice } from '@deriv-com/ui';

import { AccountActions, MenuLinks } from 'App/Components/Layout/Header';
import { AccountsInfoLoader } from 'App/Components/Layout/Header/Components/Preloader';
import NewVersionNotification from 'App/Containers/new-version-notification';
import BrandLogo from 'App/Components/Elements/BrandLogo';
import { Modal } from '@deriv/components';
import { useTranslations } from '@deriv-com/translations';

const HeaderLegacy = observer(() => {
    const { client, ui, notifications } = useStore();
    const { is_logged_in, is_logging_in } = client;
    const { is_app_disabled, is_route_modal_on } = ui;
    const { addNotificationMessage, client_notifications, removeNotificationMessage } = notifications;

    const { isMobile } = useDevice();
    const { localize } = useTranslations();
    
    const [is_disclaimer_open, setIsDisclaimerOpen] = React.useState(false);

    const addUpdateNotification = () => addNotificationMessage(client_notifications?.new_version_available);
    const removeUpdateNotification = React.useCallback(
        () => removeNotificationMessage({ key: 'new_version_available' }),
        [removeNotificationMessage]
    );

    React.useEffect(() => {
        document.addEventListener('IgnorePWAUpdate', removeUpdateNotification);
        return () => document.removeEventListener('IgnorePWAUpdate', removeUpdateNotification);
    }, [removeUpdateNotification]);

    return (
        <header
            className={classNames('header', {
                'header--is-disabled': is_app_disabled || is_route_modal_on,
            })}
        >
            <div className='header__menu-items'>
                <div className='header__logo' style={{ cursor: 'pointer' }} onClick={() => window.open('https://zullu.co.ke/', '_blank', 'noopener,noreferrer')}>
                    <BrandLogo height='28px' className='header__logo-img' />
                </div>

                <MenuLinks onOpenDisclaimer={() => setIsDisclaimerOpen(true)} />

                {is_logging_in ? (
                    <div id='dt_core_header_acc-info-preloader' className='acc-info__preloader'>
                        <AccountsInfoLoader is_logged_in={is_logged_in} />
                    </div>
                ) : (
                    <AccountActions />
                )}
            </div>

            <Modal
                is_open={is_disclaimer_open}
                small
                has_close_icon
                toggleModal={() => setIsDisclaimerOpen(false)}
                title={localize('Risk Disclaimer')}
            >
                <div className='disclaimer-modal-content'>
                    <p className='disclaimer-modal-text-lead'>
                        {localize('Deriv offers complex derivatives, such as options and contracts for difference ("CFDs"). These products may not be suitable for all clients, and trading them puts you at risk.')}
                    </p>
                    
                    <div className='disclaimer-modal-section'>
                        <h4 className='disclaimer-modal-section-title'>{localize('Please ensure you understand these risks:')}</h4>
                        <ul className='disclaimer-modal-list'>
                            <li>
                                <span className='disclaimer-modal-list-bullet'>•</span>
                                <span className='disclaimer-modal-list-item-text'>{localize('You may lose some or all of your invested capital')}</span>
                            </li>
                            <li>
                                <span className='disclaimer-modal-list-bullet'>•</span>
                                <span className='disclaimer-modal-list-item-text'>{localize('Currency conversion affects your profit/loss')}</span>
                            </li>
                            <li>
                                <span className='disclaimer-modal-list-bullet'>•</span>
                                <span className='disclaimer-modal-list-item-text'>{localize('Markets can be volatile and unpredictable')}</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className='disclaimer-modal-section disclaimer-modal-section--important'>
                        <span className='disclaimer-modal-badge'>{localize('Important')}</span>
                        <p className='disclaimer-modal-text-important'>
                            {localize('Never trade with borrowed money or funds you cannot afford to lose.')}
                        </p>
                    </div>
                    
                    <p className='disclaimer-modal-text-footer'>
                        {localize('By continuing, you confirm that you understand these risks and that you are aware that Deriv does not provide investment advice.')}
                    </p>
                </div>
            </Modal>

            <NewVersionNotification onUpdate={addUpdateNotification} />
        </header>
    );
});

export default HeaderLegacy;
