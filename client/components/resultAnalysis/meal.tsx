import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

type Food = {
  _id: string;
  item: string;
  quantity: string;
  calories: string;
  estimatedTotalCalories: string;
};

type MealProps = {
  name: string;
  totalCalories: number;
  transcription: string;
  foods: Food[];
};

export const MealCard = ({
  name,
  totalCalories,
  transcription,
  foods,
}: MealProps) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.header}>{name}</Text>
      <View style={styles.totalCaloriesContainer}>
        <Text style={styles.totalCaloriesText}>Calories Totales :</Text>
        <Text style={styles.totalCaloriesValue}>{totalCalories} cal</Text>
      </View>
      <Text style={styles.transcription}>{transcription}</Text>
      <View style={styles.foodList}>
        <Text style={styles.subHeader}>Détails :</Text>
        <View>
          {foods.map((food) => (
            <View key={food._id} style={styles.foodItem}>
              <View>
                <Text style={styles.foodItemName}>
                  {food.quantity} {food.item}
                </Text>
                <Text style={styles.foodItemCalories}>{food.calories}</Text>
              </View>
              <Text style={styles.foodItemTotalCalories}>
                {food.estimatedTotalCalories} cal
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  transcription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  foodList: {
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  scrollView: {
    maxHeight: 150,
  },
  foodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  foodItemCalories: {
    fontSize: 12,
    color: "#777",
  },
  foodItemTotalCalories: {
    fontSize: 14,
    color: "#333",
  },
  totalCaloriesContainer: {
    backgroundColor: "#e6f7ff",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  totalCaloriesText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF",
  },
  totalCaloriesValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007BFF",
    marginTop: 4,
  },
});
