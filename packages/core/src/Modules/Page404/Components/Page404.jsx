import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Text } from '@deriv/components';
import { routes } from '@deriv/shared';
import { useTranslations } from '@deriv-com/translations';

const Page404 = () => {
    const { localize } = useTranslations();
    const history = useHistory();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 100px)',
            padding: '40px 20px',
            background: 'var(--general-main-1, #0e0e0e)',
            textAlign: 'center',
            fontFamily: 'var(--font-family, Inter, sans-serif)',
            color: 'var(--color-text-primary, #ffffff)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient background glow */}
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255, 68, 79, 0.15) 0%, rgba(0,0,0,0) 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'relative',
                zIndex: 1,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '60px 40px',
                maxWidth: '540px',
                width: '100%',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(16px)'
            }}>
                <Text size='xxxl' weight='bold' style={{
                    fontSize: '84px',
                    lineHeight: '1',
                    background: 'linear-gradient(135deg, #ff444f 0%, #ff888f 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '16px',
                    display: 'block'
                }}>
                    404
                </Text>

                <Text size='xl' weight='bold' style={{ marginBottom: '16px', display: 'block', fontSize: '24px' }}>
                    {localize("Page Not Found")}
                </Text>

                <Text size='s' color='secondary' style={{ marginBottom: '36px', display: 'block', lineHeight: '1.6' }}>
                    {localize("The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.")}
                </Text>

                <Button
                    has_effect
                    primary
                    large
                    onClick={() => history.push(routes.index)}
                    style={{
                        padding: '0 32px',
                        height: '48px',
                        borderRadius: '24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0 8px 16px rgba(255, 68, 79, 0.3)'
                    }}
                >
                    {localize("Return to trading")}
                </Button>
            </div>
        </div>
    );
};

export default Page404;
