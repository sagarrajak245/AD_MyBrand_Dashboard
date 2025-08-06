import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useRef, useState } from "react";

export function ProfileEditor() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState("/api/placeholder/80/80");
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("Alex");
    const [lastName, setLastName] = useState("Brand");

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Simulate save logic
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="w-20 h-20 shrink-0">
                    <AvatarImage src={imageSrc} loading="lazy" />
                    <AvatarFallback className="text-xl">
                        {firstName[0]}{lastName[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center sm:text-left">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <Button
                        variant="outline"
                        className="glass-light"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Upload Photo
                    </Button>
                    <p className="text-sm text-light-gray">JPG, PNG or GIF (max. 5MB)</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="glass-light border-0"
                        disabled={!isEditing}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="glass-light border-0"
                        disabled={!isEditing}
                    />
                </div>
            </div>

            {isEditing ? (
                <Button className="glass-accent" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            ) : (
                <Button
                    variant="outline"
                    className="glass-light"
                    onClick={() => setIsEditing(true)}
                >
                    Edit Profile
                </Button>
            )}
        </div>
    );
}
