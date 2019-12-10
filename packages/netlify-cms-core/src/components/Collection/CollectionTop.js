import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';
import { Icon, components, buttons, shadows, colors, colorsRaw, lengths } from 'netlify-cms-ui-default';
import { VIEW_STYLE_LIST, VIEW_STYLE_GRID } from 'Constants/collectionViews';

const CollectionTopContainer = styled.div`
  ${components.cardTop};
`;

const CollectionTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CollectionTopHeading = styled.h1`
  ${components.cardTopHeading};
`;

const CollectionTopNewButton = styled(Link)`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};

  padding: 0 30px;
`;

const CollectionTopDescription = styled.p`
  ${components.cardTopDescription};
`;

const SearchInput = styled.input`
  background-color: #eff0f4;
  border-radius: ${lengths.borderRadius};
  font-size: 14px;
  padding: 10px 6px 10px 32px;
  width: 100%;
  margin-right: 24px;
  position: relative;
  z-index: 0;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${colorsRaw.blue};
  }
`;


const ViewControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ViewControlsText = styled.span`
  font-size: 14px;
  color: ${colors.text};
  margin-right: 12px;
`;

const ViewControlsButton = styled.button`
  ${buttons.button};
  color: ${props => (props.isActive ? colors.active : '#b3b9c4')};
  background-color: transparent;
  display: block;
  padding: 0;
  margin: 0 4px;

  &:last-child {
    margin-right: 0;
  }

  ${Icon} {
    display: block;
  }
`;

class CollectionTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render () {
    const {query} = this.state;
    const {
      collectionLabel,
      collectionLabelSingular,
      collectionDescription,
      viewStyle,
      onChangeViewStyle,
      onSearch,
      newEntryUrl,
      t,
    } = this.props;
      
      return (
        <CollectionTopContainer>
          <CollectionTopRow>
            <CollectionTopHeading>{collectionLabel}</CollectionTopHeading>
            {newEntryUrl ? (
              <CollectionTopNewButton to={newEntryUrl}>
                {t('collection.collectionTop.newButton', {
                  collectionLabel: collectionLabelSingular || collectionLabel,
                })}
              </CollectionTopNewButton>
            ) : null}
          </CollectionTopRow>
          {collectionDescription ? (
            <CollectionTopDescription>{collectionDescription}</CollectionTopDescription>
          ) : null}
          <ViewControls>
            <SearchInput  
                onChange={e => this.setState({ query: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && onSearch(query)}
                placeholder={t('collection.collectionTop.search')}
                value={query}
              ></SearchInput>
            <ViewControlsText>{t('collection.collectionTop.viewAs')}:</ViewControlsText>
            <ViewControlsButton
              isActive={viewStyle === VIEW_STYLE_LIST}
              onClick={() => onChangeViewStyle(VIEW_STYLE_LIST)}
            >
              <Icon type="list" />
            </ViewControlsButton>
            <ViewControlsButton
              isActive={viewStyle === VIEW_STYLE_GRID}
              onClick={() => onChangeViewStyle(VIEW_STYLE_GRID)}
            >
              <Icon type="grid" />
            </ViewControlsButton>
          </ViewControls>
        </CollectionTopContainer>
      );
      };
};

CollectionTop.propTypes = {
  collectionLabel: PropTypes.string.isRequired,
  collectionLabelSingular: PropTypes.string,
  collectionDescription: PropTypes.string,
  viewStyle: PropTypes.oneOf([VIEW_STYLE_LIST, VIEW_STYLE_GRID]).isRequired,
  onChangeViewStyle: PropTypes.func.isRequired,
  newEntryUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default translate()(CollectionTop);
