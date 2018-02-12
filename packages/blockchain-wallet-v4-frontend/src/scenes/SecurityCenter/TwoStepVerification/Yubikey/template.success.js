import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Text, Link, Icon } from 'blockchain-info-components'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'

import { SecurityDescription, SecurityHeader } from 'components/Security'

const AuthenticatorSummary = styled.div`
  width: 90%;
  padding: 0px 20px;
  opacity: ${props => props.authType !== 0 ? 0.3 : 1};
`
const Header = SecurityHeader.extend`
  justify-content: flex-start;
`
const YubikeyContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const QRInputWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  button {
    margin-top: 10px;
  }
`
const SuccessOverlay = styled.div`
  width: 90%;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: ${props => props.authType !== 0 ? 'flex' : 'none'};
  position: absolute;
  left: 0px;
`
const YubikeyInput = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  min-height: 40px;
  padding: 6px 12px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.42;
  color: ${props => props.theme['gray-5']};
  background-color: ${props => props.theme['white']};
  background-image: none;
  outline-width: 0;
  user-select: text;
  border: 1px solid  ${props => props.theme[props.borderColor]};

  &::-webkit-input-placeholder {
    color: ${props => props.theme['gray-2']};
  }
`

const Yubikey = props => {
  const { data } = props

  return (
    <form onSubmit={props.handleSubmit}>
      <SuccessOverlay authType={data.authType}>
        <Icon name='checkmark-in-circle' size='150px' color='success' />
        <Text size='14px' weight={300} color='success'>
          <FormattedMessage id='scenes.security.twostepverification.description' defaultMessage="Congrats! You've successfully set up Google Authenticator." />
        </Text>
      </SuccessOverlay>
      <AuthenticatorSummary authType={data.authType}>
        <Header>
          <FormattedMessage id='scenes.security.twostepverification.title' defaultMessage='Two-Step Verification - Yubikey' />
          <Link size='14px' onClick={props.goBack}>Change</Link>
        </Header>
        <SecurityDescription>
          <Text size='14px' weight={200}>
            <FormattedMessage id='scenes.security.twostepverification.description' defaultMessage='Two-step Verification helps prevent unauthorized access to your wallet by requiring a one-time password after every login attempt. Enabling this option helps keep unauthorized users from being able to access your wallet.' />
          </Text>
        </SecurityDescription>
        <YubikeyContainer>
          <Text size='14px' weight={200}>
            <FormattedMessage id='scenes.security.twostepverification.description' defaultMessage='1. Inser the Yubikey into an available USB port.' />
          </Text>
          <Text size='14px' weight={200}>
            <FormattedMessage id='scenes.security.twostepverification.description' defaultMessage='2. Pair your Yubikey' />
          </Text>
          <QRInputWrapper>
            <YubikeyInput type='password' name='yubikeyCode' value={props.value} onChange={props.handleInput} />
            {/* <Button nature='primary' onClick={props.handleSubmit}>
              <FormattedMessage id='scenes.security.twostepverification.description' defaultMessage='Pair Yubikey' />
            </Button> */}
          </QRInputWrapper>
        </YubikeyContainer>
      </AuthenticatorSummary>
    </form>
  )
}

Yubikey.propTypes = {
  // authType: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'securityYubikey'
})(Yubikey)
