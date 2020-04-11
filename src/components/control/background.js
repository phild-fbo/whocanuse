import React from 'react'
import {
  BackgroundWrapper,
  Hash,
  HexWrapper,
  ColourControlBackground,
  SwitchIcon,
  ColourHeader,
} from './styled'
import Switch from '../../images/switch.svg'
import { SmallText } from '../typography'
import chroma from 'chroma-js'
import { Sliders } from './sliders'
import Tippy from '@tippy.js/react'

export const Background = ({
  background,
  getBackgroundTextColor,
  setBackground,
  onClick,
}) => {
  return (
    <ColourControlBackground>
      <ColourHeader>
        <SmallText>Background</SmallText>
        <Tippy
          content="Switch background and text colors"
          duration="0"
          arrow="true"
          placement="top"
          animation="shift-away"
        >
          <SwitchIcon>
            <img src={Switch} alt="Switch colors" />
          </SwitchIcon>
        </Tippy>
      </ColourHeader>
      <BackgroundWrapper
        background={background.color.hex()}
        onClick={e => {
          if (e.target === e.currentTarget) {
            onClick()
          }
        }}
      >
        <Hash textColour={getBackgroundTextColor}>#</Hash>
        <HexWrapper
          type="text"
          autocomplete="off"
          name="background"
          textColour={getBackgroundTextColor}
          value={
            background.valueKind === 'hex'
              ? background.value
              : background.color.hex().replace('#', '')
          }
          onKeyPress={e => {
            if (e.key.match(/[^0-9a-fA-F]/) && !e.metaKey) {
              e.preventDefault()
            }
          }}
          onPaste={e => {
            const text = e.clipboardData.getData('Text')
            e.preventDefault()
            if (chroma.valid(text)) {
              setBackground({
                color: chroma(text).alpha(1),
                value: text,
                valueKind: 'hex',
              })
            }
          }}
          onChange={e => {
            const backgroundWithHash = `#${e.target.value}`
            setBackground({
              color: chroma(
                chroma.valid(backgroundWithHash)
                  ? backgroundWithHash
                  : background.color,
              ),
              value: e.target.value,
              valueKind: 'hex',
            })
          }}
        />
      </BackgroundWrapper>
      <Sliders color={background} updateColor={setBackground} />
    </ColourControlBackground>
  )
}
