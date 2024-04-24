"use client"
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { getFirestore, doc, getDoc, setDoc, query, collection, getDocs, where, addDoc } from 'firebase/firestore/lite';
import { app } from '../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Colors from '../Utils/Colors';

const db = getFirestore(app);

const ChecklistItem = ({ item }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.todo}</Text>
        </View>
    );
};

const Checklist = () => {
    const { user, isLoading } = useUser();
    const [items, setItems] = useState([]);
    const [newItemText, setNewItemText] = useState('');
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        user && isDocRegistered();
        user && getTodo();
    }, [user]);

    const isDocRegistered = async () => {
        try {
            const docRef = doc(db, "Todo", user?.fullName);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };


    const addTodo = async () => {
        if (newItemText != '') {
            const docRef = await addDoc(collection(db, "Todo"), {
                todo: newItemText,
                user: user?.fullName,
                userName: user?.firstName
            });
            console.log("Document written with ID: ", docRef.id);
            getTodo();
            setNewItemText('');
        }else{
            console.log("task vuota")
        }

    };


    const getTodo = async () => {
        setTodoList([]);
        const q = query(collection(db, 'Todo'), where('user', '==', user?.fullName))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().todo);
            setTodoList(prevEvent => [...prevEvent, doc.data().todo])
        });


    }

    const printAll = () => {
        console.log(todoList)
    }

    renderItem = ({ item }) => {
        return (
            <View>
                <Text style={styles.itemText}>{item}</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new item"
                    value={newItemText}
                    onChangeText={setNewItemText}
                    onSubmitEditing={addTodo}
                />
                <TouchableOpacity onPress={addTodo} style={styles.addButton}>
                    <Text style={styles.addButtonLabel}>Aggiungi</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.todolistContainer}>
                <FlatList style={styles.item}
                    data={todoList}
                    keyExtractor={(x) => x.toString()}
                    renderItem={this.renderItem}
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 40
    },
    addButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 40
    },
    addButtonLabel: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 15,
    },
    todolistContainer: {
        paddingTop: 40
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 250
    },
    itemText: {
        fontFamily: 'outfit',
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 15
    },

});

export default Checklist;
