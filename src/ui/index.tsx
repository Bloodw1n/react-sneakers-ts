import React from 'react';
import styled from 'styled-components';

export const CardWrapper = styled.div`
    border: 1px solid #f3f3f3;
    padding: 30px;
    width: 220px;
    border-radius: 40px;
    margin-right: 30px;
    transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
    margin-bottom: 30px;

    &:hover {
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.06);
        transform: translateY(-5px);
    }
`;
