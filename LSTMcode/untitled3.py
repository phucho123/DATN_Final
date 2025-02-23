# -*- coding: utf-8 -*-
"""Untitled3.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1t3_nit_TNRnNOIPzV4WFCOnb53dWsIS-
"""

# Commented out IPython magic to ensure Python compatibility.
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# %matplotlib inline
from sklearn.preprocessing import MinMaxScaler
from keras.preprocessing.sequence import TimeseriesGenerator
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from keras.layers import Dropout
from tensorflow import keras
import warnings
warnings.filterwarnings("ignore")

data = pd.read_csv('./waterconsumption.csv')

data_end = int(np.floor(0.8*(data.shape[0])))
train = data[0:data_end]['Water Consumption']
train =train.values.reshape(-1)
test = data[data_end:]['Water Consumption'].values.reshape(-1)

def get_data(train,test,time_step,num_predict):
  x_train= list()
  y_train = list()
  x_test = list()
  y_test = list()

  for i in range(0,len(train) - time_step - num_predict):
    x_train.append(train[i:i+time_step])
    y_train.append(train[i+time_step:i+time_step+num_predict])

  for i in range(0, len(test) - time_step - num_predict):
    x_test.append(test[i:i+time_step])
    y_test.append(test[i+time_step:i+time_step+num_predict])

  return np.asarray(x_train), np.asarray(y_train), np.asarray(x_test), np.asarray(y_test)

x_train, y_train, x_test, y_test = get_data(train,test,30,1)
print(x_train)
print(x_train.shape)

# dua ve 0->1 cho tap train
scaler = MinMaxScaler()
x_train = x_train.reshape(-1,30)

print(x_train)
print(x_train.shape)

x_train = scaler.fit_transform(x_train)
y_train = scaler.fit_transform(y_train)

# dua ve 0->1 cho tap test
x_test = x_test.reshape(-1,30)

x_test = scaler.fit_transform(x_test)
y_test = scaler.fit_transform(y_test)

# print(x_train,y_train)

# Reshape lai cho dung model
x_train = x_train.reshape(-1,30,1)
y_train = y_train.reshape(-1,1)

#reshape lai cho test
x_test = x_test.reshape(-1,30,1)
y_test = y_test.reshape(-1,1)
# date_test = date_test.reshape(-1,1)

print(x_train)
print(x_train.shape)
print(y_train)
print(y_train.shape)

#dau vao 30 doan 1
n_input = 30
n_features = 1

model = Sequential()
model.add(LSTM(units=128,activation='relu', input_shape=(n_input, n_features), return_sequences=True))
model.add(Dropout(0.2))

model.add(LSTM(units=64, return_sequences=True))
model.add(Dropout(0.2))

model.add(LSTM(units=32, return_sequences=False))
model.add(Dropout(0.2))

# model.add(LSTM(units=50))
# model.add(Dropout(0.3))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')

# model.compile(optimizer='adam', loss='mse')

history = model.fit(x_train, y_train, epochs=150, validation_split=0.2, verbose=1, batch_size=32)
model.save('./model.h5')

loss = history.history['loss']
val_loss = history.history['val_loss']

# Plot the training and validation loss
epochs = range(1, len(loss) + 1)

plt.figure(figsize=(8, 6))
plt.plot(epochs, loss, 'b-', label='Train')
plt.plot(epochs, val_loss, 'orange', label='Validation')
plt.title('Model Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend(loc='upper right')

plt.show()

model = keras.models.load_model('model.h5')

test_output = model.predict(x_test)

# print(test_output)
print(test_output.shape)
print(y_test.shape)
test_1 = scaler.inverse_transform(test_output)
test_2=scaler.inverse_transform(y_test)
plt.plot(test_1[:100], color='r')
plt.plot(test_2[:100] ,color='b')
plt.title("Water Consumption Prediction")
plt.xlabel("STT")
plt.ylabel("Water Consumption")
plt.legend(('prediction', 'reality'),loc='upper right')
plt.show()

def mean_absolute_percentage_error(y_true, y_pred, epsilon=1e-10):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs((y_true - y_pred) / (y_true + epsilon))) * 100

model = keras.models.load_model('model.h5')

test_output = model.predict(x_test)

test_predictions = scaler.inverse_transform(test_output)
actual_values = scaler.inverse_transform(y_test)

mape = mean_absolute_percentage_error(actual_values, test_predictions)
print(f'MAPE: {mape}%')

accuracy = 100 - mape
print(f'Accuracy: {accuracy}%')