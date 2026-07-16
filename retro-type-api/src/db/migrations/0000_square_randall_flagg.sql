CREATE TABLE "typing_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"wpm" integer NOT NULL,
	"accuracy" integer NOT NULL,
	"total_keystrokes" integer NOT NULL,
	"correct_keystrokes" integer NOT NULL,
	"incorrect_keystrokes" integer NOT NULL,
	"duration" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"badge_type" text NOT NULL,
	"awarded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"difficulty" text DEFAULT 'normal' NOT NULL,
	"quick_restart" text DEFAULT 'off' NOT NULL,
	"repeat_quotes" text DEFAULT 'off' NOT NULL,
	"blind_mode" text DEFAULT 'off' NOT NULL,
	"always_show_words_history" text DEFAULT 'off' NOT NULL,
	"single_list_command_line" text DEFAULT 'manual' NOT NULL,
	"min_speed" text DEFAULT 'off' NOT NULL,
	"min_speed_custom" integer DEFAULT 100 NOT NULL,
	"min_accuracy" text DEFAULT 'off' NOT NULL,
	"min_accuracy_custom" integer DEFAULT 90 NOT NULL,
	"sound_volume" text DEFAULT '0.5' NOT NULL,
	"play_sound_on_click" text DEFAULT 'off' NOT NULL,
	"play_sound_on_error" text DEFAULT 'off' NOT NULL,
	"play_time_warning" text DEFAULT 'off' NOT NULL,
	"font_size" text DEFAULT '2' NOT NULL,
	"font_family" text DEFAULT 'Special Elite' NOT NULL,
	"local_font" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "typing_sessions" ADD CONSTRAINT "typing_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;