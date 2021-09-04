package com.pokemimo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import android.widget.Toast
import com.facebook.react.bridge.ReactMethod
import com.github.dhaval2404.imagepicker.ImagePicker
import com.facebook.react.bridge.BaseActivityEventListener
import android.app.Activity
import android.net.Uri
import android.content.Intent
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import java.io.File
import android.util.Base64
import com.facebook.react.bridge.Promise

class RNImagePickerModule : ReactContextBaseJavaModule {

    private val reactContext: ReactApplicationContext
    private var promise: Promise? = null

    constructor(reactContext: ReactApplicationContext) : super(reactContext) {
        this.reactContext = reactContext
        val mActivityEventListener = object : BaseActivityEventListener() {
            override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, intent: Intent) {
                if (resultCode == Activity.RESULT_OK) {
                    intent.data?.getPath()?.let {
                        promise?.resolve(encoder(it))
                    } ?: promise?.reject("error_data", "Data not exist")

                } else if (resultCode == ImagePicker.RESULT_ERROR) {
                    promise?.reject("error_image", ImagePicker.getError(intent))
                } else {
                    promise?.reject("error_cancel", "The user has canceled the action")
                }
            }
        }

        reactContext.addActivityEventListener(mActivityEventListener);
    }

    override fun getName() = "ImagePicker"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    @ReactMethod
    fun getImage(promise: Promise) {
        this.promise = promise
        getCurrentActivity()?.let { currentActivity ->
            ImagePicker.with(currentActivity)
                .crop(1f, 1f)
                .galleryMimeTypes(
                    mimeTypes = arrayOf(
                        "image/png",
                        "image/jpg",
                        "image/jpeg"
                    )
                )
                .compress(maxSize = 1024)
                .maxResultSize(width = 1080, height = 1080)
                .start()
        }
    }

    private fun encoder(filePath: String): String {
        val bytes = File(filePath).readBytes()
        return Base64.encodeToString(bytes, Base64.NO_WRAP)
    }
}
