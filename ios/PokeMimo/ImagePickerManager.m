//
//  ImagePickerManager.m
//  PokeMimo
//
//  Created by Juan on 2/9/21.
//

#import "ImagePickerManager.h"
#import <Photos/Photos.h>
#import <UIKit/UIKit.h>
#import <React/RCTUtils.h>


@interface ImagePickerManager ()
@property (nonatomic,strong) RCTPromiseRejectBlock reject;
@property (nonatomic,strong) RCTPromiseResolveBlock resolve;
@end

@interface ImagePickerManager (UIImagePickerControllerDelegate) <UIImagePickerControllerDelegate,UINavigationControllerDelegate>

@end

@implementation ImagePickerManager
RCT_EXPORT_MODULE(ImagePicker);

RCT_EXPORT_METHOD(getImage:(RCTPromiseResolveBlock) resolve reject:(RCTPromiseRejectBlock)reject)
{
  self.resolve = resolve;
  self.reject = reject;
  
  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"Pokemon Image" message:@"Get a image for your pokemon" preferredStyle:UIAlertControllerStyleActionSheet];
  
  UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(UIAlertAction * action) {
    reject(@"error_cancel",@"User has canceled the action",nil);
  }];
  if ([UIImagePickerController isSourceTypeAvailable: UIImagePickerControllerSourceTypeCamera]){
    UIAlertAction * takePhoto = [UIAlertAction actionWithTitle:@"Take photo" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {
      [self takePhoto];
    }];
    
    [alertController addAction:takePhoto];
  }
  UIAlertAction * chooseGallery = [UIAlertAction actionWithTitle:@"Choose from gallery" style:UIAlertActionStyleDefault handler:^(UIAlertAction * action) {
    [self choosePhotoFromLibrary];
  }];
  
  [alertController addAction:cancelAction];
  [alertController addAction:chooseGallery];
  
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *root = RCTPresentedViewController();
    [root presentViewController:alertController animated: YES completion: nil];
  });
}


- (void)takePhoto
{
  UIImagePickerController *_imagePicker = [[UIImagePickerController alloc] init];
  _imagePicker.sourceType = UIImagePickerControllerSourceTypeCamera;
  _imagePicker.delegate = self;
  _imagePicker.allowsEditing = YES;
  
  
  [self checkCameraPermissions:^(BOOL granted) {
    if (!granted) {
      [self showErrorCamera];
      return;
    }
    UIViewController *root = RCTPresentedViewController();
    [root presentViewController:_imagePicker animated:YES completion:nil];
  }];
  
  
}


- (void)choosePhotoFromLibrary
{
  UIImagePickerController *_imagePicker = [[UIImagePickerController alloc] init];
  _imagePicker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
  _imagePicker.delegate = self;
  _imagePicker.allowsEditing = YES;
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *root = RCTPresentedViewController();
    [root presentViewController:_imagePicker animated:YES completion:nil];
  });
}


- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
  UIViewController *root = RCTPresentedViewController();
  [root dismissViewControllerAnimated:YES completion:^{
    UIImage *editedImage = info[UIImagePickerControllerEditedImage];
    
    NSString *base64 = [self encodeToBase64String:editedImage];
    
    self.resolve(base64);
  }];
}

- (NSString *)encodeToBase64String:(UIImage *)image {
  return [UIImagePNGRepresentation(image) base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
}


- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
  UIViewController *root = RCTPresentedViewController();
  [root dismissViewControllerAnimated:YES completion:nil];
  self.reject(@"error_cancel",@"User has canceled the action",nil);
}


- (void) showErrorCamera {
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"Need camera access"
                                                                 message:@"Camera access is required to make full use of this app."
                                                          preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"Allow camera" style:UIAlertActionStyleDefault
                                                        handler:^(UIAlertAction * action) {
    NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
    [[UIApplication sharedApplication] openURL:url options:@{} completionHandler:nil];
  }];
  UIAlertAction* cancelAction = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel
                                                       handler:^(UIAlertAction * action) {
    self.reject(@"error_permision",@"User hasn't accepted the camera permission",nil);
  }];
  
  [alert addAction:cancelAction];
  [alert addAction:defaultAction];
  
  
  UIViewController *root = RCTPresentedViewController();
  [root presentViewController:alert animated:YES completion:nil];
}

- (void)checkCameraPermissions:(void(^)(BOOL granted))callback
{
  AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
  if (status == AVAuthorizationStatusAuthorized) {
    callback(YES);
    return;
  }
  else if (status == AVAuthorizationStatusNotDetermined){
    [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
      callback(granted);
      return;
    }];
  }
  else {
    callback(NO);
  }
}

@end

