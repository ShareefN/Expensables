import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TotalSpending({ total, currency }) {
    return <Text>{`${total} ${currency}`}</Text>
}

const styles = StyleSheet.create({})