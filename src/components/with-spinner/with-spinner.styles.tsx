import styled from "styled-components";

export const SpinnerOverlay = styled.div<{ widthOverlay?: number }>`
  height: 60vh;
  width: ${({ widthOverlay }) => widthOverlay || 100}%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div<{ widthAndHeight?: number }>`
  display: inline-block;
  width: ${({ widthAndHeight }) => widthAndHeight || 50}px;
  height: ${({ widthAndHeight }) => widthAndHeight || 50}px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
