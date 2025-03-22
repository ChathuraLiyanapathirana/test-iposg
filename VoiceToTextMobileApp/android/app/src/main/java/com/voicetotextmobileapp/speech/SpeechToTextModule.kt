package com.voicetotextmobileapp.speech

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.util.Log
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.*

class SpeechToTextModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var speechRecognizer: SpeechRecognizer? = null
    private var recognizerIntent: Intent? = null
    private var isListening = false
    private val reactContext = reactContext
    private val mainHandler = Handler(Looper.getMainLooper())
    private val TAG = "SpeechToTextModule"

    override fun getName(): String = "SpeechToTextModule"

    init {
        mainHandler.post {
            if (SpeechRecognizer.isRecognitionAvailable(reactContext)) {
                initializeSpeechRecognizer()
            } else {
                sendEvent("onSpeechError", "Speech recognition is not available on this device")
            }
        }
    }

    private fun initializeSpeechRecognizer() {
        Log.d(TAG, "Initializing SpeechRecognizer")
        speechRecognizer?.destroy()
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(reactContext)
        recognizerIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault())
        }

        speechRecognizer?.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(params: Bundle?) {
                Log.d(TAG, "onReadyForSpeech")
                sendEvent("onSpeechStart", null)
            }

            override fun onBeginningOfSpeech() {
                Log.d(TAG, "onBeginningOfSpeech")
            }

            override fun onRmsChanged(rmsdB: Float) {}

            override fun onBufferReceived(buffer: ByteArray?) {}

            override fun onEndOfSpeech() {
                Log.d(TAG, "onEndOfSpeech")
                isListening = false // Ensure isListening is reset here
                sendEvent("onSpeechEnd", null)
            }

            override fun onError(error: Int) {
                val errorMessage = when (error) {
                    SpeechRecognizer.ERROR_NETWORK -> "Network error"
                    SpeechRecognizer.ERROR_NO_MATCH -> "No speech match found"
                    SpeechRecognizer.ERROR_RECOGNIZER_BUSY -> "Recognizer is busy"
                    SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "Insufficient permissions"
                    SpeechRecognizer.ERROR_SERVER -> "Server error"
                    SpeechRecognizer.ERROR_CLIENT -> "Client error"
                    SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "Speech timeout"
                    SpeechRecognizer.ERROR_AUDIO -> "Audio recording error"
                    else -> "Unknown error: $error"
                }
                Log.d(TAG, "onError: $errorMessage")
                isListening = false // Reset isListening on error
                sendEvent("onSpeechError", errorMessage)
            }

            override fun onResults(results: Bundle?) {
                val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                matches?.firstOrNull()?.let { sendEvent("onSpeechResults", it) }
                Log.d(TAG, "onResults: ${matches?.firstOrNull()}")
                isListening = false // Reset isListening when results are received
            }

            override fun onPartialResults(partialResults: Bundle?) {
                val matches = partialResults?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                matches?.firstOrNull()?.let { sendEvent("onSpeechPartialResults", it) }
                Log.d(TAG, "onPartialResults: ${matches?.firstOrNull()}")
            }

            override fun onEvent(eventType: Int, params: Bundle?) {}
        })
    }

    private fun sendEvent(eventName: String, message: String?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, message)
    }

    @ReactMethod
    fun startListening(promise: Promise) {
        if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "Audio recording permission not granted")
            return
        }

        mainHandler.post {
            if (speechRecognizer == null) {
                promise.reject("NOT_AVAILABLE", "Speech recognition is not available on this device")
                return@post
            }

            if (isListening) {
                Log.d(TAG, "startListening: Speech recognition already in progress")
                promise.reject("ALREADY_LISTENING", "Speech recognition already in progress")
                return@post
            }

            // Reinitialize SpeechRecognizer to ensure a clean state
            initializeSpeechRecognizer()
            speechRecognizer?.startListening(recognizerIntent)
            isListening = true
            Log.d(TAG, "startListening: Started listening")
            promise.resolve("Started listening")
        }
    }

    @ReactMethod
    fun stopListening(promise: Promise) {
        mainHandler.post {
            if (!isListening) {
                Log.d(TAG, "stopListening: Speech recognition not in progress")
                promise.reject("NOT_LISTENING", "Speech recognition not in progress")
                return@post
            }

            speechRecognizer?.stopListening()
            isListening = false
            Log.d(TAG, "stopListening: Stopped listening")
            promise.resolve("Stopped listening")
        }
    }

    @ReactMethod
    fun destroy(promise: Promise) {
        mainHandler.post {
            speechRecognizer?.destroy()
            isListening = false
            speechRecognizer = null
            Log.d(TAG, "destroy: Speech recognizer destroyed")
            promise.resolve("Speech recognizer destroyed")
        }
    }
}