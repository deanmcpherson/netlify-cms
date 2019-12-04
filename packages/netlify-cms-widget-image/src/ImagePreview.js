import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { List } from 'immutable';
import { WidgetPreviewContainer } from 'netlify-cms-ui-default';

const StyledImage = styled(({ getAsset, value }) => {
  const [src, setSrc] = useState();

  useEffect(() => {
    let subscribed = true;

    getAsset(value).then(url => subscribed && setSrc(url));

    return () => {
      subscribed = false;
    };
  }, []);

  return <img src={src || ''} role="presentation" />;
})`
  display: block;
  max-width: 100%;
  height: auto;
`;

const ImagePreviewContent = props => {
  const { value, getAsset } = props;
  if (Array.isArray(value) || List.isList(value)) {
    return value.map(val => <StyledImage key={val} value={val} getAsset={getAsset} />);
  }
  return <StyledImage {...props} />;
};

const ImagePreview = props => {
  return (
    <WidgetPreviewContainer>
      {props.value ? <ImagePreviewContent {...props} /> : null}
    </WidgetPreviewContainer>
  );
};

ImagePreview.propTypes = {
  getAsset: PropTypes.func.isRequired,
  value: PropTypes.node,
};

export default ImagePreview;
